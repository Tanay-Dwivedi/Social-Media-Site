import React from "react";
// import {Row,Column} from "react-bootstrap";
import "./profile-main.scss";
// import { useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../Context/Authcontext";

const Right = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { username, followers, followings } = user;
  return (
    <>
      <div className="profile-user">
        <div className="profile-bottom">
          <i class="fas fa-user-circle fa-3x"></i>
        </div>

        <div className="profile-bottom">
          <h1>{username}</h1>
        </div>

        <div className="user-details profile-bottom">
          <div>
            <p>Post</p>
            <p>9</p>
          </div>

          <div>
            <p>Followers</p>
            <p>{followers.length}</p>
          </div>

          <div>
            <p>Following</p>
            <p>{followings.length}</p>
          </div>
        </div>

        <div className="edit-user">
          <div>
            <h1 style={{}}>First Name</h1>
            <button>Edit Profile</button>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nobis
            praesentium fuga pariatur ea sit unde aliquid corrupti quibusdam
            temporibus.
          </p>
        </div>
      </div>
    </>
  );
};

export default Right;
