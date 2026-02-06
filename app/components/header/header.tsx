"use client"

import { useState } from "react";
import Image from "next/image";
import SearchBar from "./searchBar";
import ProfileMenu from "./profileMenu";
import ShoppingCart from "./shoppingCart";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <div className="header">
            <div className="logoSearchContainer">
                <div>
                    <Image src="/prism_logo.png" alt="Logo" width={300} height={250} />
                </div>
                <SearchBar />
            </div>

            <div className="shopProfileContainer">
                <ShoppingCart />
                <ProfileMenu open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}