"use client"

import { createContext, useState, useEffect, useContext } from "react";

export type ProductItem = {
    id: number;
    image: string;
    title: string;
    price: number;
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
    const [products, setProducts] = useState<ProductItem[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data = await res.json();

            const formattedProducts: ProductItem[] = data.map((p: any) => ({
                id: p.product_id,
                image: p.image_url,
                title: p.product_name,
                price: Number(p.product_price),
                quantity: p.stock_quantity,
                description: p.product_description,
            }));

            setProducts(formattedProducts);
        }

        fetchProducts();
    }, []);


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