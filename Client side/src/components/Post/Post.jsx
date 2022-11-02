import React, { useState } from "react";
import {
  faComment,
  faShareSquare,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.scss";
import img from "../../assets/66068.jpg";

function Post() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="post">
      <div className="post-inside">
        <div className="top-bar">
          <img src={img} alt="" className="profile-img" />
          <h5> ABC </h5>
        </div>
        <center>
          <img
            src={img}
            alt="Your network connection is slow"
            className="mid-img"
          />
        </center>
        <p>
          <div
            className={`heart ${liked ? "is-active" : ""}`}
            onClick={() => {
              setLiked((prev) => {
                return !prev;
              });
            }}
          ></div>

          <FontAwesomeIcon icon={faBookmark} className="right-icon" size="2x" />

          <FontAwesomeIcon
            icon={faShareSquare}
            className="right-icon"
            size="2x"
          />
          <FontAwesomeIcon icon={faComment} className="right-icon" size="2x" />
        </p>
        <div className="comments">
          <p>Test comment</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
