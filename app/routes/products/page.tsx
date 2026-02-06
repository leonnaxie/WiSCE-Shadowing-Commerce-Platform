import { dummyFProducts } from "@/mockData/dummyFP";
import FPCard from "../../components/featured_products/fpCard";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function ProductsPage() {
    return (
        <div className="productsPage">
            <Header />
            <h2>All Products</h2>
            <div className="productsGrid">
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