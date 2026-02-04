import Image from "next/image";

export default function SearchBar() {
    return (
        <form className="searchFunction" role="search">
        <input type="search"
                id="searchFunction"
                name="searchBar"
                placeholder="What are you looking for?"
                aria-label="Search for content">
        </input>
        <button
            className="searchButton"
            type="submit"
            aria-label="Submit search">
            <Image src="/search_magnifiying_glass.png" alt="Logo" width={30} height={30} />
        </button>
        </form>  
    );
}