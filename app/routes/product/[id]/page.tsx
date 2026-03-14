"use client"

import { useParams } from "next/navigation";
import FPCard from "@/app/components/featured_products/fpCard";
import Header from "@/app/components/header/header";
import { useState, useEffect } from "react";
import Footer from "@/app/components/footer/footer";
import Image from "next/image";
import "@/app/css/product.css";
import Link from "next/link";
import { UseCart } from "@/app/context/cartContext";
import { ProductContext } from "@/app/context/productContext";

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

    const { addToCart } = UseCart();

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productId]);

    const handleAddtoCart = () => {
        if (product) {
            addToCart({
                id: product.product_id,
                image: product.image_url,
                title: product.product_name,
                price: product.product_price,
                description: product.product_description,
            });
        }
    }

    const handleBuyNow = () => {
        if (product) {
            addToCart({
                id: product.product_id,
                image: product.image_url,
                title: product.product_name,
                price: product.product_price,
                description: product.product_description,
            });
        }
    }

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
                <div className="productTitlePriceHeader">
                    <h1 className="productTitle">{product.product_name}</h1>
                    <h1 className="productPrice">{product.product_price}</h1>
                </div>

                <p className="productDescription">{product.product_description}</p>

                <div className="productQuantity">
                    <span>Quantity:</span>
                    <span className="quantityValue">{product.stock_quantity}</span>
                </div>

                <div className="cartOptions">
                    <button className="addToCart" onClick={handleAddtoCart}>Add to Cart</button>
                    <Link href="/routes/shoppingcart">
                        <button className="buyNow" onClick={handleBuyNow}>Buy Now</button>
                    </Link>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}