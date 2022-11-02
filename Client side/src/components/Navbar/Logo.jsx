import "./Navbar.scss";
import logo from "../../assets/logo.png";
function Logo() {
  return (
    <a className="logoo" href="/">
      <img src={logo} alt="logo" />
    </a>
  );
}

export default Logo;
