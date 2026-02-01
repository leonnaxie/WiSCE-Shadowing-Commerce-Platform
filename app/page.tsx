import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="header">
        <div className="logo">
          Logo Placeholder
        </div>

        <search>
          <input type="search"
                 id="searchFunction"
                 name="searchBar"
                 placeholder="What are you looking for?"
                 aria-label="Search for content">
          </input>
          <button type="submit">
            Search
          </button>
        </search>

        <div className="logIn">
          Log In Profile
        </div>
      </div>

      <div className="rotatingItems">
        <img src="blindbox.jpg" alt="Blindbox" />
      </div>
      <div className="mainContent">
        Find items here
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}
