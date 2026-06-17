function Header() {
  return (
    <header className="header">
      <h1 className="logo">GameHelper</h1>

      <nav className="nav">
        <div className="dropdown">
          <button>Games ▼</button>
          <div className="dropdown-content">
            <a href="#">New Releases</a>
            <a href="#">Popular</a>
            <a href="#">Discounts</a>
          </div>
        </div>

        <div className="dropdown">
          <button>Categories ▼</button>
          <div className="dropdown-content">
            <a href="#">Action</a>
            <a href="#">RPG</a>
            <a href="#">Strategy</a>
            <a href="#">Adventure</a>
            <a href="#">Horror</a>
          </div>
        </div>

        <div className="dropdown">
          <button>Platforms ▼</button>
          <div className="dropdown-content">
            <a href="#">PC</a>
            <a href="#">PlayStation</a>
            <a href="#">Xbox</a>
          </div>
        </div>
      </nav>

      <div className="search">
        <input type="text" placeholder="Search games..." />
        <button>Search</button>
      </div>
    </header>
  );
}

export default Header;