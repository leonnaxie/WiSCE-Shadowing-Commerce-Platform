"use client"

import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

type User = {
    name: string,
    email: string;
    address?: string;
    paymentMethod?: string;
    orders_placed?: number;
};

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/users/me");
                if (!res.ok) throw new Error("Not logged in");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.log("No user logged in:", err);
            }
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function UseUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser needs to be within a UserProvider");
    } 
    return context;
}