import Image from "next/image";
import { UseCart } from "@/app/context/cartContext";

export default function ShoppingCart() {
    const { cartCount } = UseCart();

    return (
        <div className="shoppingCartIcon">
            <button
            className="shoppingCartBtn">
                <Image src="/shopping_cart.png" alt="Shopping Cart" width={85} height={85} />
                {cartCount > 0 && (
                    <span className="cartCounter">{cartCount}</span>
                )}
            </button>
        </div>
    )
}