"use client"

import { useState } from "react";
import { UseUser } from "@/app/context/userContext";

export default function AuthForm() {
    const { setUser } = UseUser();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        /** API FETCHING */
        try {
            const endpoint = isLogin ? "/api/users/login" : "/api/users";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(isLogin ?
                    { usernameOrEmail: email, password } :
                    { username: email.split("@")[0], email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            setUser(data);
            console.log("User logged in:", {data});
        } catch (err) {
            console.log(err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="authContainer">
            <h2 className="authTitle">
                { isLogin ? "Sign In" : "Create Account" }
            </h2>

            <div className="authToggle">
                <button 
                className={ isLogin ? "active" : "" }
                onClick={ () => {
                    setIsLogin(true);
                }}>
                    Login
                </button>

                <button 
                className={ !isLogin ? "active" : "" }
                onClick={ () => {
                    setIsLogin(false);
                }}>
                    Register
                </button>
            </div>

            <form onSubmit={handleSubmit} className="authForm">
                <div className="formGroup">
                    <div className="formFlex">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required placeholder="Enter your email" />
                    </div>
                </div>

                <div className="formGroup">
                    <div className="formFlex">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required placeholder="Enter your password" />
                    </div>
                </div>

                { !isLogin && (
                    <div className="formGroup">
                        <div className="formFlex">
                             <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            required placeholder="Confirm your password" />
                        </div>
                    </div>
                )}

                <div className="submitFlex">
                    <button type="submit" className="submitAuthForm">
                        { isLogin ? "Sign In" : "Create Account" }
                    </button>
                </div>
            </form>

            <div className="divider">
                <span>OR</span>
            </div>

            <div className="googleBtn">
                <span className="googleIcon">G</span>
                Sign In Through Google
            </div>
        </div>
    );
}