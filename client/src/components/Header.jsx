import "../App.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="mt-5 mb-5">
      <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
        <h1 className="text-center">A life full of travel</h1>
      </Link>
    </header>
  );
}
