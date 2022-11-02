import React from "react";
import Left from "../../components/Side-bar/left";
// import Navbar from "../../components/Navbar/Navbar.jsx";
import logo from "../../assets/logo.png";
import Right from "./right-profile";
import PMid from "./mid-profile";
import "./profile-main.scss";
// import {Row,Col} from "react-bootstrap";

const profile = () => {
  return (
    <>
      <div className="profile-main">
        <div className="profile-left">
          <a className="plogoo-profile" href="/">
            <img src={logo} alt="logo" />
          </a>

          <Left style={{ marginTop: "1rem" }} />
        </div>

        <div className="profile-mid">
          <PMid />
        </div>

        <div className="profile-right">
          <Right />
        </div>
      </div>
    </>
  );
};

export default profile;
