import Image from "next/image";
import Link from "next/link";
import { UseUser } from "@/app/context/userContext";

type ProfileMenuProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileMenu({ open, setOpen }: ProfileMenuProps) {
    const { user, setUser } = UseUser();

    return (
        <div className="logIn">
            <button
            className="logOrRegister"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={ () => setOpen(!open)}>
            <Image src="/profile_icon.png" alt="Profile" width={85} height={85} />
            </button>

            {open && (
            <div className="profileDropdown" role="menu">
                {!user ? (
                    <>
                    <Link href="/routes/authentication">
                        <button role="menuitem" id="sign_in">Sign In</button>
                    </Link>

                    <Link href="/routes/authentication">
                        <button role="menuitem" id="register">Register</button>
                    </Link>
                    </>
                ) : (
                    <>
                    <Link href="/routes/userprofile">
                        <button role="menuitem" id="profile">Profile</button>
                    </Link>

                        <button role="menuitem" id="log_out"
                        onClick={ async () => {
                            try {
                                const res = await fetch("/api/users/logout", { method: "POST"});
                                if (!res.ok) throw new Error("Log out failed");

                                setUser(null);
                            } catch (err) {
                                console.log(err);
                                alert("something went wrong with logging out.");
                            }
                        }}>Log Out</button>
                    </>
                )}
            </div>
            )}
        </div>
    );
}