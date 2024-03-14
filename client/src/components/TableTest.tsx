import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table  as BTable } from 'react-bootstrap';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { makeData, Item } from "../assets/makeData";

// const defaultData: Item[] = [
//         {
//         "name": "ts name 2",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing",
//             "footwear",
//             "weapon",
//             "another test tag"
//         ],
//         "conditions": [
//             "rain",
//             "test condition 1"
//         ],
//         "packed": true
//     },
//     {
//         "name": "ts name 1",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing"
//         ],
//         "conditions": [
//             "rain"
//         ],
//         "packed": false
//     },
//     {
//         "name": "ts name 3",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing"
//         ],
//         "conditions": [
//             "rain"
//         ],
//         "packed": false
//     },
//     {
//         "name": "ts name 4",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing",
//             "footwear",
//             "weapon",
//             "another test tag"
//         ],
//         "conditions": [
//             "rain",
//             "test condition 1"
//         ],
//         "packed": true
//     },
//     {
//         "name": "ts name 5",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing"
//         ],
//         "conditions": [
//             "rain"
//         ],
//         "packed": false
//     },
//     {
//         "name": "ts name 6",
//         "description": "testing item in typescript",
//         "weight": 10,
//         "tags": [
//             "clothing"
//         ],
//         "conditions": [
//             "rain"
//         ],
//         "packed": false
//     }
// ];

const columns: ColumnDef<Item>[] = [
    {
        header: () => <div>Item Name</div>,
        accessorKey: 'name',
        cell: info => info.getValue(),
    },
    {
        header: () => <div>Description</div>,
        accessorKey: 'description',
        cell: info => info.getValue(),
    },
    {
        header: () => <div>Weight</div>,
        accessorKey: 'weight',
        cell: info => info.getValue(),
    },
    {
        header: () => <div>Tags</div>,
        accessorKey: 'tags',
        cell: (props) => {
            const tags: string[] = props.getValue() as string[];
            return (
                <div>
                    {tags.join(', ')}
                </div>
            );
        },
    },
    {
        header: () => <div>Conditions</div>,
        accessorKey: 'conditions',
        cell: (props) => {
            const conditions: string[] = props.getValue() as string[];
            return (
                <div>
                    {conditions.join(', ')}
                </div>
            );
        },
    },
    {
        header: () => <div>Packed</div>,
        accessorKey: 'packed',
        cell: (props) => {
            const packed: boolean = props.getValue() as boolean;
            return (
                <div>
                    {packed ? 'Yes' : 'No'}
                </div>
            );
        },
    },
]

function TableTest () {
    const [data, setData] = React.useState(makeData(10));
    const rerender = () => setData(makeData(10));

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel<Item>(),
    });

    return (
        <div className='p-2'>
            <BTable striped bordered hover responsive size="sm">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </BTable>
            <div className="h-4">
                <button onClick={() => rerender()} className="btn btn-primary p-2">
                    Rerender
                </button>
            </div>
        </div>
    );
}

export default TableTest;