import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";

export default function UserProfile() {
    return (
        <div className="userProfile">
            <Header />
            <form>
                A form will be here with information that can be changed
                and that information delegated to the backend.
            </form>
            <Footer />
        </div>
    )
}