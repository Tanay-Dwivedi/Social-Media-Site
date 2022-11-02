import React from "react";
import User from "./users";
import img from "./pic.jpg";
import "./chatlist.scss";

function Chatlist() {
  return (
    <div class="chatlist">
      <User name="Aparna" message="DBMS marks - 35.5" img={img} last="3PM" />
      <User name="Akshat" message="DBMS marks - 39.75" img={img} last="3PM" />
      <User
        name="Abhinandan"
        message="DBMS marks - bata nahi raha"
        img={img}
        last="3PM"
      />
      <User
        name="Bhawna"
        message="DBMS marks - Abhi pata chalenge"
        img={img}
        last="3PM"
      />
    </div>
  );
}

export default Chatlist;
