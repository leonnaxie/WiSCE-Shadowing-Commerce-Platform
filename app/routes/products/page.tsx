import { dummyFProducts } from "@/mockData/dummyFP";
import FPCard from "../../components/featured_products/fpCard";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "@/app/css/products.css";

export default function ProductsPage() {
    return (
        <div className="productsPageBody">
            <Header />

            <div className="productHeader">
                <h2 id="allProductsTitle"><u>All Products</u></h2>
            </div>

            <div className="productsGrid">
                {dummyFProducts.map(product => (                    
                    <FPCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price} />
                ))}
                {dummyFProducts.map(product => (                    
                    <FPCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price} />
                ))}
            </div>

            <Footer />
        </div>
    );
}