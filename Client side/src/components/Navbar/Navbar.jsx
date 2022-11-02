import React from "react";
import "./Navbar.scss";
import { IconContext } from "react-icons/lib";
import { BsFillChatDotsFill, BsBellFill } from "react-icons/bs";
import logo from "../../assets/logo.png";

export const Navbar = (props) => {
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo  */}

        <a className="logoo" href="/">
          <img src={logo} alt="logo" />
        </a>

        {/* 2nd Search */}

        <div className="mid">
          {/* <h1>mid</h1> */}
          <div className="search-outline">
            <input type="text" placeholder="Search" className="search" />
          </div>
        </div>

        {/* 3rd Icons */}

        <IconContext.Provider value={{ color: "Black", size: "2em" }}>
          <div className="right">
            <ul className="right-desktop">
              <li>
                <a href="www.google.com" target="_blank">
                  {" "}
                  {/* notification*/}
                  <BsBellFill size={27} />
                </a>
              </li>

              <li>
                <a href="www.google.com" target="_blank">
                  {" "}
                  {/* messages/chat */}
                  <BsFillChatDotsFill size={27} />
                </a>
              </li>

              <li>
                <a href="www.google.com" target="_blank">
                  <img
                    src={props.User.profilePicture}
                    className="profilepic"
                    alt="profile-pic"
                  />
                </a>
              </li>
            </ul>
          </div>
        </IconContext.Provider>
      </nav>
    </>
  );
};

export default Navbar;
