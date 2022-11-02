import React from "react";
import "./users.scss";

function Users(props) {
  return (
    <div className="user-list">
      <div className="d-flex author">
        <div className="author-img">
          <img src={props.img} height="50px" width="50px" alt="profile-pic" />
        </div>
        <div className="author-box">
          <div className="author-name">{props.name}</div>
          <div className="author-message">{props.message}</div>
        </div>
      </div>
      <div className="author-lastseen">{props.last}</div>
    </div>
  );
}

export default Users;
