    import React, { useState } from "react";
    import useTable from "../../hooks/useTable";
    import TableFooter  from "./TableFooter";
    import { Item } from "../../types/types";



    type ResponseData = Item[];

    interface Props {
        items: ResponseData | undefined;
        perPage: number;
        handleDeleteItem?: (itemId: string) => void;
        isDeleteColumnVisible: boolean;
        addPackedItem?: (item: Item) => void;
        packedItems?: Item[];
        // handleUpdateItem: (itemId: string, updatedValues: Item) => void;
    }

    interface CategoryCondition {
        name: string;
        [key: string]: any; // for any other fields that might be present
    }

    const InventoryTable: React.FC<Props> = ({ items, perPage, handleDeleteItem, isDeleteColumnVisible, addPackedItem, packedItems }) => {
        const [page, setPage] = useState(1);
        const { slice, range } = useTable(items || [], page, perPage);
        // const [editingItem, setEditingItem] = useState<Item | null>(null);
        // const [editedValues, setEditedValues] = useState<Item | null>(null);

        // const handleEditClick = (item: Item) => {
        //     setEditingItem(item);
        //     setEditedValues(item);
        // }

        // const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Item) => {
        //     if (editedValues) {
        //         if (field === 'name' && e.target.value === '') {
        //             return;  // Ignore if name is empty
        //         }
        //         setEditedValues({
        //             ...editedValues,
        //             [field]: e.target.value
        //         });
        //     }
        // };  

        // const handleEditSubmit = async (itemId: string) => {
        //     if(editedValues) {
        //         await handleUpdateItem(itemId, editedValues);
        //         setEditingItem(null);
        //     }
        // }

        const isItemPacked = (itemId: string) => {
            if(packedItems) {
                return packedItems.some((item: Item) => item._id === itemId);
            }
            return false;
        }

        const handleCheckboxChange = (item: Item) => () => {
            if(addPackedItem){
                addPackedItem(item);
            }
        }

        console.log('Table items:', items)

        return (
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Item Inventory</h5>
                    </div>
                    <div className="card-block table-border-style">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr className='inventory-table-row'>
                                        <th>Item Name</th>
                                        <th id='inventory-table-header-description'>Item Description</th>
                                        <th>Weight</th>
                                        <th id="inventory-table-header-categories">Categories</th>
                                        <th id="inventory-table-header-use-conditions">Use Conditions</th>
                                        {isDeleteColumnVisible
                                            ? <th>Delete Item</th>
                                            : <th>Pack Item</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {slice.map((item, i) => (
                                        <tr key={i} id='inventory-table-row'>
                                            <th id='inventory-table-item-name'>
                                                {item.name}
                                            </th>
                                            <td id='inventory-table-item-description'>
                                                {item.description}
                                            </td>
                                            <td id='inventory-table-item-weight'>
                                                {item.weight}
                                            </td>
                                            <td id='inventory-table-item-tags'>
                                                    {item.categories?.map((category: CategoryCondition) => category.name).join(', ')}
                                            </td>
                                            <td id='inventory-table-item-conditions'>
                                                    {item.useConditions?.map((condition: CategoryCondition) => condition.name).join(', ')}
                                            </td>
                                            {isDeleteColumnVisible
                                                ? <td id='inventory-table-item-edit-delete'>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem && handleDeleteItem(item._id)}>Delete</button>
                                                </td>
                                                : <td>
                                                    <input 
                                                    type="checkbox" 
                                                    onChange={handleCheckboxChange(item)}
                                                    checked={isItemPacked(item._id)}
                                                    />
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    export default InventoryTable;