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
                        <button role="menuitem">Sign In</button>
                    </Link>

                    <Link href="/routes/authentication">
                        <button role="menuitem">Register</button>
                    </Link>
                    </>
                ) : (
                    <>
                    <Link href="/routes/userprofile">
                        <button role="menuitem">Profile</button>
                        <button role="menuitem"
                        onClick={ () => {
                            setUser(null);
                            setOpen(false);
                        }}>Log Out</button>
                    </Link>
                    </>
                )}
            </div>
            )}
        </div>
    );
}