"use client"

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { useState } from "react";
import "@/app/css/userProfile.css";

export default function UserProfile() {
    const [name, setName] = useState("Person");
    const [email, setEmail] = useState("something@gmail.com");
    const [address, setAddress] = useState("somewhere, somewhere");
    const [ordersPlaced, setOrdersPlaced] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved:', { name, email, ordersPlaced });
    };

    return (
        <div className="userProfilePage">
            <Header />
            <div className="profileContent">
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