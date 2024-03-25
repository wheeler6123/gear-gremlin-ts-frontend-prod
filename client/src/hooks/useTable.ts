import { useState, useEffect } from 'react';

const calculateRange = (data: any[], perPage: number) => {
    const range: number[] = [];
    const num = Math.ceil(data.length / perPage);

    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data: any[], page: number, perPage: number): any[] => {
    return data.slice((page-1) * perPage, (page) * perPage);
}

const useTable = (data: any[], page: number, perPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<any[]>([]);

    useEffect(() => {
        const range = calculateRange(data, perPage);
        setTableRange([...range]);

        const slice = sliceData(data, page, perPage);
        setSlice([...slice]);

    }, [data, setTableRange, page, setSlice]);

    return { slice, range : tableRange}
};

export default useTable;
