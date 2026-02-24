"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import SearchBar from "./searchBar";
import ProfileMenu from "./profileMenu";
import ShoppingCart from "./shoppingCart";
import TestUsers from "../testComponents/testUsers";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <div className="header">
            <div className="logoSearchContainer">
                <div>
                    <Link href="/">
                        <Image src="/prism_logo.png" alt="Logo" width={300} height={250} />
                    </Link>
                </div>
                <SearchBar />
            </div>

            <div className="shopProfileContainer">
                <Link href="/routes/shoppingcart">
                    <ShoppingCart />
                </Link>

                <ProfileMenu open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}