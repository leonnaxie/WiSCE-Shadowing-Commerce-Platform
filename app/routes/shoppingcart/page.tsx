import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";

export default function CartPage() {
    return (
        <div className="shoppingCart">
            <Header />
            <div className="cartSection">Cart will be here</div>
            <div className="checkoutForm">Form on the other side</div>
            <Footer />
        </div>
    );
}