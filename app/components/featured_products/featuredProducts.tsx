"use client"

import Link from "next/link";
import FPCard from "./fpCard";
import { ProductItem, ProductContext } from "@/app/context/productContext";
import { useContext } from "react";

export default function FeaturedProducts() {
    const context = useContext(ProductContext);
    if (!context) throw new Error("ProductContext must be used within a Product Provider");
    const { products } = context;

    return (
    <div className="mainContent">
        <div className="featuredProducts">
            <div className="fpHeader">
                <h2 className="featuredProductsTitle">
                <u style={{ color: "#A7CECE"}}>FEATURED</u> PRODUCTS</h2>
            </div>

            <div className="fpCards">
                {products.slice(0, 5).map((product:ProductItem) => (
                <FPCard
                key ={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                />
                ))}
            </div>

            <Link href="/routes/products">
                <div className="viewProductListings">
                    <button className="viewPLBtn">
                        View More
                    </button>
                </div>
            </Link>
        </div>


    </div>
    );
}