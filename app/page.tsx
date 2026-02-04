import Header from "./components/header/header";
import Carousel from "./components/carousel/carousel";
import FeaturedProducts from "./components/featured_products/featuredProducts";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}