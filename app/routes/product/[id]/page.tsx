"use client"

import { useParams } from "next/navigation";
import FPCard from "@/app/components/featured_products/fpCard";
import Header from "@/app/components/header/header";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import "@/app/css/product.css";
import Link from "next/link";

type Product = {
    product_id: number;
    product_name: string;
    product_price: number;
    product_description: string;
    stock_quantity: number;
    image_url: string;
};

export default function ProductPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const productId = Number(id);

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>
    }

    console.log(product);

    return (
        <div className="productPage">
            <Header />
            <div className="borderGap"></div>
            
            <div className="productContent">
                <div className="productImageSection">
                    <div className="productImageWrapper">
                        <Image src={product.image_url} alt={product.product_name} fill style={{ objectFit: "contain" }} />
                    </div>
                </div>

                <div className="productDetailSection">
                <h1 className="productTitle">{product.product_name}</h1>

                <p className="productDescription">{product.product_description}</p>

                <div className="productQuantity">
                    <span>Quantity:</span>
                    <span className="quantityValue">{product.stock_quantity}</span>
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