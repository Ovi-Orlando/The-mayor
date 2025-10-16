import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#222", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
        Inicio
      </Link>
      <Link to="/admin" style={{ color: "#fff" }}>
        Admin
      </Link>
    </nav>
  );
}

export default Navbar;