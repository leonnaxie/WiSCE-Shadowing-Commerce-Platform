import Image from "next/image";

type FPCardProps = {
    id: string;
    image: string;
    title: string;
    price: string;
    quantity?: number;
}

export default function FPCard({ id, image, title, price, quantity}: FPCardProps) {
    return (
        <div className="fpCard">
            <div className="fpImageWrapper">
                <Image src={image} alt={title} fill style={{ objectFit: "contain"}} />
            </div>

            <p id="fProductName">{title}</p>
            <p id="fProductPrice">{price}</p>

            <div className="fpBtns">
                <button className="addToCart">Add to Cart</button>
                <button className="buyNow">Buy Now</button>
            </div>
        </div>
    )
}