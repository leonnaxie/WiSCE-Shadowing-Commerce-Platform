"use client"

import Image from "next/image";
import CarouselCard from "./carouselCard";

export default function Carousel() {
    return (
    <div className="rotatingItems">
        <ol className="carouselViewPort">
            <li id="carouselSlide1" tabIndex={0} className="carouselSlide">
                <div className="carouselSnapper">
                    <CarouselCard id="1" image={"/tote_bag_icon.png"} title="Tote Bag" price="$$$" />
                </div>
            </li>

            <li id="carouselSlide2" tabIndex={0} className="carouselSlide">
                <div className="carouselSnapper">
                    <CarouselCard id="2" image={"/tote_bag_icon.png"} title="Tote Bag" price="$$$" />
                </div>
            </li>

            <li id="carouselSlide3" tabIndex={0} className="carouselSlide">
                <div className="carouselSnapper">
                    <CarouselCard id="3" image={"/tote_bag_icon.png"} title="Tote Bag" price="$$$" />
                </div>
            </li>
        </ol>

        <button className="carouselPrev"
        onClick={() => {
            document.querySelector(".carouselViewPort")
            ?.scrollBy({ left: -window.innerWidth, behavior: "smooth"});
        }}></button>

        <button className="carouselNext"
        onClick={() => {
            document.querySelector(".carouselViewPort")
            ?.scrollBy({ left: window.innerWidth, behavior: "smooth"});
        }}></button>

        <aside className="carouselNav">
            <ol className="carouselNavList">
                <li className="carouselNavItem">
                    <a 
                    href="#carouselSlide1"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("carouselSlide1")
                        ?.scrollIntoView({ behavior: "smooth", inline: "center"});
                    }}>
                        Go to slide 1
                    </a>
                </li>

                <li className="carouselNavItem">
                    <a 
                    href="#carouselSlide2"
                    onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("carouselSlide2")
                    ?.scrollIntoView({ behavior: "smooth", inline: "center"});
                    }}>
                        Go to slide 2
                    </a>
                </li>

                <li className="carouselNavItem">
                    <a 
                    href="#carouselSlide3"
                    onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("carouselSlide3")
                    ?.scrollIntoView({ behavior: "smooth", inline: "center"});
                    }}>
                        Go to slide 3
                    </a>
                </li>
            </ol>
        </aside>

    </div>
    );
}