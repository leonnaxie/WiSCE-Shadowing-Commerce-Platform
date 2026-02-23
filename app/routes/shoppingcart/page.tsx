"use client"

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import "@/app/css/shoppingCart.css";
import { UseUser } from "@/app/context/userContext";
import { useState, useEffect } from "react";
import { UseCart } from "@/app/context/cartContext";
import Image from "next/image";

export default function CartPage() {
    const { user, setUser } = UseUser();
    const { cart, updateQuantity, removeFromCart, clearCart } = UseCart();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [address, setAddress] = useState(user?.address || "");
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setAddress(user.address || "");
            setPaymentMethod("");
        }
    }, [user]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/users/me", { credentials: "include" });
                if (!res.ok) throw new Error("failed to fetch user information");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        }
        if (!user) fetchUser();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Order submitted:", { name, email, address, paymentMethod, cart });
        clearCart();
    }

    const incrementQuantity = (id: number, currentQuantity: number) => {
        updateQuantity(id, currentQuantity + 1);
    }

    const decrementQuantity = (id: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            updateQuantity(id, currentQuantity - 1);
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };



    return (
        <div className="shoppingCartBody">
            <Header />

            <div className="scHeader">
                    <h2 id="shoppingCartTitle"><u>Shopping Cart</u></h2>
                </div>

            <div className="shoppingCart">
                <div className="cartSection">
                        {cart.length === 0 ? (<p style={{ padding: '20px', textAlign: 'center', }}>Your Cart is Empty</p>) :
                        (
                            <>
                            <ol className="shoppingCartItems">
                                {cart.map((item) => (
                                    <li key={item.id} className="cartItem">
                                        <div className="cartItemImage">
                                            <Image src={item.image} alt={item.title} fill style={{ objectFit: 'contain' }} />
                                        </div>

                                        <div className="cartItemDetails">
                                            <div className="titlePriceRow">
                                                <h3 className="cartItemTitle">{item.title}</h3>
                                                <div className="cartItemTotal">${(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                            <p className="cartItemDescription">{item.description}</p>
                                            <div className="itemButtons">
                                                <div className="quantityControls">
                                                <button onClick={() => decrementQuantity(item.id, item.quantity)} disabled={item.quantity <= 1}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => incrementQuantity(item.id, item.quantity)}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="removeBtn">Remove</button>
                                            </div>
                                            </div>
                                    </li>
                                ))}
                            </ol>
                            </>
                        )}
                    <div className="cartBorder">
                        <div className="totalPrice">
                            <p>Total</p>
                            <p>${getTotalPrice().toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="checkoutFormBody">
                    <p id="checkoutForm">Checkout</p>
                    <form className="checkoutForm">
                        <div className="checkoutFlex">
                            <label htmlFor="userName" id="uName">Name:</label>
                            <input type="text" id="userName" name="userName" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userAddress" id="uAddress">Address:</label>
                            <input type="text" id="userAddress" name="userAddress" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userEmail" id="uEmail">Email:</label>
                            <input type="email" id="userEmail" name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userPP" id="uPP">Payment Method:</label>
                            <input type="text" id="userPP" name="userPP" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required />
                        </div>

                        <div className="submitFlex">
                            <input type="submit" id="orderSubmit" value="Place your order" />
                        </div>
                    </form>

                    <p id="thankYouMessage">Thank you for shopping with us!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}