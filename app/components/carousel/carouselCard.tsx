import Image from "next/image";

type CarouselCardProps = {
    id: string;
    image: string;
    title: string;
    price: string;
}

export default function CarouselCard({ id, image, title, price}: CarouselCardProps) {
    return (
        <div className="carouselCard">

            <div className="imageWrapper">
                <Image src={image} alt={title} height="150" width="245" />
            </div>

            <div className="carouselCardHeader">
                <p id="productName">{title}</p>
                <p id="productPrice">{price}</p>
            </div>

            <button className="productLearnMore">Learn More</button>
        </div>
    )
}