"use client"

import { useParams } from "next/navigation";
import { dummyFProducts } from "@/mockData/dummyFP";
import FPCard from "@/app/components/featured_products/fpCard";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import "@/app/css/product.css";
import Link from "next/link";

export default function ProductPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const productId = Number(id);
 
    const product = dummyFProducts.find(p => p.id === productId)
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="productPage">
            <Header />
            <div className="borderGap"></div>
            
            <div className="productContent">
                <div className="productImageSection">
                    <div className="productImageWrapper">
                        <Image src={product.image} alt={product.title} fill style={{ objectFit: "contain" }} />
                    </div>
                </div>

                <div className="productDetailSection">
                <h1 className="productTitle">{product.title}</h1>

                <p className="productDescription">{product.description}</p>

                <div className="productQuantity">
                    <span>Quantity:</span>
                    <span className="quantityValue">{product.quantity}</span>
                </div>

                <div className="cartOptions">
                    <button className="addToCart">Add to Cart</button>
                    <Link href="/routes/shoppingcart">
                        <button className="buyNow">Buy Now</button>
                    </Link>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}