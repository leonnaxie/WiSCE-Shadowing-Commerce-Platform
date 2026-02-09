"use client"

import { useState } from "react";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        console.log('Form submitted:', { email, password, isLogin });
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