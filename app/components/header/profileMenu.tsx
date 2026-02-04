import Image from "next/image";

type ProfileMenuProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileMenu({ open, setOpen }: ProfileMenuProps) {
    return (
        <div className="logIn">
            <button
            className="logOrRegister"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={ () => setOpen(!open)}>
            <Image src="/profile_icon.png" alt="Profile" width={50} height={50} />
            </button>

            {open && (
            <div className="profileDropdown" role="menu">
                <button role="menuitem">Sign In</button>
                <button role="menuitem">Register</button>
            </div>
            )}
        </div>
    )
}