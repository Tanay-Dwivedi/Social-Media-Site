import React, { useContext } from "react";
import Left from "../../components/Side-bar/left";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
import Chatbody from "../../components/Chat-body/chat";
import Chatlist from "../../components/Chat-body/chatlist";
import "../../components/Navbar/Navbar.scss";
import "./messenger.scss";
import icon from "../../components/Right-Side-bar/pic.jpg";

function Messenger() {
  const { user } = useContext(AuthContext);

  const Logout = async () => {
    try {
      sessionStorage.removeItem("user");
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      const temp = await axios.get("/auth/logout");
      console.log(temp);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="messenger">
      <Navbar User={user} />
      <Left Logout={Logout} />
      <section className="chat">
        <div className="header">
          <div className="title">
            <div className="title-head">
              <img src={icon} alt="profile-pic" />
              <div class="title-con">
                <div className="up"> Akshat</div>
                <div className="down">last seen</div>
              </div>
            </div>
            <div className="icons">
              <i class="fas fa-video"></i>
              <i class="fas fa-phone-alt"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between side-nav">
            CHATS
            <i class="fas fa-search"></i>
          </div>
        </div>

        <div className="d-flex flex-row">
          <Chatbody />
          <Chatlist />
        </div>
      </section>
    </div>
  );
}

export default Messenger;
