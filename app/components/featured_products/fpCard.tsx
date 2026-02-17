import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ProductContext } from "@/app/context/productContext";
import { UseCart } from "@/app/context/cartContext";


type FPCardProps = {
    id: number;
    image: string;
    title: string;
    price: string;
    quantity?: number;
    description?: string;
}

export default function FPCard({ id, image, title, price, quantity, description}: FPCardProps) {
    const productContext = useContext(ProductContext);
    const { addToCart } = UseCart();

    if (!productContext) throw new Error("ProductContext must be used within a Product Provider");

    const handleAddtoCart = () => {
        const product = productContext.products.find(p => p.id === id);
        if (product) {
            addToCart({
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                description: product.description,
            });
        }
    };

    const handleBuyNow = () => {
        const product = productContext.products.find(p => p.id === id);
        if (product) {
            addToCart({
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                description: product.description,
            });
        };
    }

    return (
        <div className="fpCard">
                <Link href={`/routes/product/${id}`}
                    className="fpImageWrapper"
                    style={{ position: "relative"}}>
                <Image src={image} alt={title} fill style={{ objectFit: "contain"}} />
            </Link>

            <div className="productWrapper">
                 <p id="fProductName">{title}</p>
                <p id="fProductPrice">{price}</p>

                <div className="fpBtns">
                    <button className="addToCart" onClick={handleAddtoCart}>Add to Cart</button>
                    <Link href="/routes/shoppingcart">
                        <button className="buyNow" onClick={handleBuyNow}>Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}