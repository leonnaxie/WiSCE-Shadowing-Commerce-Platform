import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import "@/app/css/shoppingCart.css";

export default function CartPage() {
    return (
        <div className="shoppingCartBody">
            <Header />

            <div className="scHeader">
                    <h2 id="shoppingCartTitle"><u>Shopping Cart</u></h2>
                </div>

            <div className="shoppingCart">
                <div className="cartSection">
                    <ol className="shoppingCartItems">
                        <li id="scItem">Example</li>
                        <li id="scItem">Example</li>
                    </ol>
                    <div className="cartBorder">
                        <div className="totalPrice">
                            <p>Total</p>
                            <p>$$$</p>
                        </div>
                    </div>
                </div>
                <div className="checkoutFormBody">
                    <p id="checkoutForm">Checkout</p>
                    <form className="checkoutForm">
                        <div className="checkoutFlex">
                            <label htmlFor="userName" id="uName">Name:</label>
                            <input type="text" id="userName" name="userName" required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userAddress" id="uAddress">Address:</label>
                            <input type="text" id="userAddress" name="userAddress" required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userEmail" id="uEmail">Email:</label>
                            <input type="email" id="userEmail" name="userEmail" required />
                        </div>

                        <div className="checkoutFlex">
                            <label htmlFor="userPP" id="uPP">Payment Method:</label>
                            <input type="text" id="userPP" name="userPP" required />
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