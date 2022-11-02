import React, { useContext } from "react";
import Post from "../../components/Post/Post";
import AddPost from "../../components/Upload-post/newPost"
import Left from "../../components/Side-bar/left";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import "./home.scss";
import Bar from "../../components/Right-Side-bar/Bar";
import { AuthContext } from "../../Context/Authcontext";

function Home() {
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
    <div className="Homepage">
      <Navbar User={user} />
      <Left Logout={Logout} />
      <div className="add-post"><AddPost /></div>
      <div className="posts">
        <Post />
        <Post />
        <Post />
      </div>
      <Bar user="Akshat" />
    </div>
  );
}

export default Home;
