"use client"

import { dummyFProducts } from "@/mockData/dummyFP";
import { createContext, useState, useEffect, useContext } from "react";

export type ProductItem = {
    id: number;
    image: string;
    title: string;
    price: string;
    quantity: number;
    description?: string;
}

export type ProductContextType = {
    products: ProductItem[];
    setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
    decrementQuantity: (item:ProductItem, quantity:number) => void;
    incrementQuantity: (item:ProductItem, quantity:number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<ProductItem[]>(dummyFProducts);

    const decrementQuantity = (item:ProductItem, quantity = 1) => {
        setProducts(products.map(p => p.id === item.id ? { ...p, quantity: p.quantity - quantity} : p));

    };

    const incrementQuantity = (item:ProductItem, quantity = 1) => {
        setProducts(products.map(p => p.id === item.id ? { ...p, quantity: p.quantity + quantity} : p));
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, decrementQuantity, incrementQuantity }}>
            {children}
        </ProductContext.Provider>
    );
};