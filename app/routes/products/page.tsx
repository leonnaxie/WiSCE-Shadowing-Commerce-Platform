"use client"

import FPCard from "../../components/featured_products/fpCard";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import "@/app/css/products.css";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    return (
        <div className="productsPageBody">
            <Header />

            <div className="productHeader">
                <h2 id="allProductsTitle"><u>All Products</u></h2>
            </div>

            <div className="productsGrid">
                {products.map((product:any) => (
                    <FPCard
                        key={product.product_id}
                        id={product.product_id}
                        image={product.image_url}
                        title={product.product_name}
                        price={Number(product.product_price)}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}