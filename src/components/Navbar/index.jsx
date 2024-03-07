import logo from "../../assets/images/logo.png";
import "./styles.css";
function Navbar() {
  return (
    <nav className="nav">
      <img className="img" src={logo}></img>
    </nav>
  );
}

export default Navbar;
