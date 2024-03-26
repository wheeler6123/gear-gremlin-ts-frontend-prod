import React, { useEffect } from "react";

interface TableFooterProps {
    range: number[];
    setPage: (page: number) => void;
    page: number;
    slice: any[];
}

const TableFooter: React.FC<TableFooterProps> = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if(slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className="table-footer">
            {range.map((el,index) => (
                <button 
                    key={index}
                    className={`${page === el ? 'btn btn-primary' : 'btn btn-outline-primary'}`}
                    onClick={() => setPage(el)}
                >
                    {el}
                </button>   
            ))}
        </div>
    );
};

export default TableFooter;