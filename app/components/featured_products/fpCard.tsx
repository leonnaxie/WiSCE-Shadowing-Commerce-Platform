import Image from "next/image";
import Link from "next/link";

type FPCardProps = {
    id: number;
    image: string;
    title: string;
    price: string;
    quantity?: number;
    description?: string;
}

export default function FPCard({ id, image, title, price, quantity, description}: FPCardProps) {
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
                    <button className="addToCart">Add to Cart</button>
                    <Link href="/routes/shoppingcart">
                        <button className="buyNow">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}