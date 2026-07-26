import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        <h1>MediFlow</h1>
        <span>Clinic Management System</span>
      </div>

      <nav className="header-nav">

        <Link to="/">Accueil</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </nav>

    </header>
  );
}

export default Header;