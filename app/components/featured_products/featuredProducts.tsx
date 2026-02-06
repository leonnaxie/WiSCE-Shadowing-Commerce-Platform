import FPCard from "./fpCard";
import { dummyFProducts } from "@/mockData/dummyFP";

export default function FeaturedProducts() {
    return (
    <div className="mainContent">
        <div className="featuredProducts">
            <div className="fpHeader">
                <h2 className="featuredProductsTitle">
                <u style={{ color: "#A7CECE"}}>FEATURED</u> PRODUCTS</h2>
            </div>

            <div className="fpCards">
                {dummyFProducts.map((product) => (
                <FPCard
                key ={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                />
                ))}
            </div>

            <div className="viewProductListings">
                <button className="viewPLBtn">
                    View More
                </button>
            </div>
        </div>


    </div>
    );
}