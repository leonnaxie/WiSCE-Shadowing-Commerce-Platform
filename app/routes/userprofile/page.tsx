"use client"

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { useState, useEffect} from "react";
import "@/app/css/userProfile.css";
import { UseUser } from "@/app/context/userContext";

export default function UserProfile() {
    const { user, setUser }= UseUser();
    const [name, setName] = useState(user?.name || "Person");
    const [email, setEmail] = useState(user?.email || "");
    const [address, setAddress] = useState(user?.address || "");
    const [ordersPlaced, setOrdersPlaced] = useState(user?.orders_placed || 0);

    useEffect(() => {
        if (user) {
            setName(user.name || "Person");
            setEmail(user.email || "");
            setAddress(user.address || "");
            setOrdersPlaced(user.orders_placed || 0);
        }
    }, [user]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/users/me", { credentials: "include" });
                if (!res.ok) throw new Error("failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch(err) {
                console.log(err);
            }
        }

        if (!user) fetchUser();
    }, []);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = { name, email, address };
        try {
            const res = await fetch("/api/users/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updatedUser),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Failed to update profile");
                return;
            }

            setUser(data);
        } catch (err) {
            console.log(err);
            alert("Something went wrong with updating your profile.");
        }
    };

    return (
        <div className="userProfilePage">
            <Header />
            <div className="profileContent">
                <div className="half-half-container"></div>
                
                    <div className="profileCard">
                        <h1 className="profileGreeting">HELLO <span className="userName">{name || 'Person'}</span></h1>


                    <form onSubmit={handleSubmit} className="profileForm">
                            <div className="profileField">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="What's your name?" />
                            </div>

                            <div className="profileField">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" />
                            </div>

                            <div className="profileField">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address" />
                            </div>

                            <div className="profileField">
                                <label htmlFor="orders">Orders Placed:</label>
                                <span className="ordersCount">{ordersPlaced}</span>
                            </div>

                            <button type="submit" className="saveBtn">SAVE</button>
                    </form>
                    </div>
            </div>
            <Footer />
        </div>
    
    )
}