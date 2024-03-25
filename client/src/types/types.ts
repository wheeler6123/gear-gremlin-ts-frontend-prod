//database document types

export interface Item {
    _id?: string;
    name: string;
    description?: string;
    weight?: number;
    categories?: Tag[];
    useConditions?: Tag[];
    packed: boolean;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface NewItem {
    name: string;
    description?: string;
    weight?: number;
    categories?: string[];
    useConditions?: string[];
    packed: boolean;
    userId?: string;
}

export interface User {
    _id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Trip {
    _id?: string;
    name: string;
    items: Item[];
    totalWeight: number;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryTag {
    _id?: string;
    name: string;
    createdBy?: string;
}

export interface UsageTag {
    _id?: string;
    name: string;
    createdBy?: string;
}

export interface Tag {
    _id?: string;
    name: string;
    createdBy?: string;
}


//api types
