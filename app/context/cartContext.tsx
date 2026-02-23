"use client"

import React, { createContext, useContext, useState } from "react";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    description?: string;
}

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeFromCart: (itemId: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem);
            } else {
                return [...prevCart, { ...item, quantity }];
            }
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCart((prevCart) => prevCart.map((item) => item.id === itemId ? { ...item, quantity } : item ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function UseCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Use Cart must be used within a CartProvider");
    }
    return context;
}