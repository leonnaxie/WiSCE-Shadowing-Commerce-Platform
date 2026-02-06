"use client"

import { useParams } from "next/navigation";
import { dummyFProducts } from "@/mockData/dummyFP";
import FPCard from "@/app/components/featured_products/fpCard";

export default function ProductPage() {
    const { id } = useParams();

    const product = dummyFProducts.find(p => p.id === id);
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="productPage">
            <h2>{product.title}</h2>
            <FPCard {...product} />
            <p>{product.quantity}</p>
            <p>Description Here!</p>

            <div className="cartOptions">
                <button className="addToCart">Add to Cart</button>
                <button className="buyNow">Buy Now</button>
            </div>
        </div>
    );
}