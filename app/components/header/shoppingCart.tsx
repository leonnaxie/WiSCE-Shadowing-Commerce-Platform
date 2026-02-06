import Image from "next/image";

export default function ShoppingCart() {
    return (
        <div className="shoppingCartIcon">
            <button
            className="shoppingCartBtn">
                <Image src="/shopping_cart.png" alt="Shopping Cart" width={85} height={85} />
            </button>
        </div>
    )
}