import "./Bar.scss";
import Profile from "./Profile";
import img from "./pic.jpg";

function Bar(props) {
  return (
    <div className="right1">
      <div>
        <div className="d">
          <span>
            <strong>Suggestions For You</strong>
          </span>
          <span>
            <a href="https://github.com/" className="right-a">
              See All
            </a>
          </span>
        </div>
        <Profile name="Akshat Nema" />
        <Profile name="Abhinandan Gaur" />
        <Profile name="Aparna Bhatt" />
        <Profile name="Bhawna Khatri" />
        <Profile name="Dev Sharma" />
        <hr />
      </div>
      <div className="account">
        <h4>Account</h4>
        <hr />
        <div className="d acc-details">
          <div>
            <img
              src={img}
              alt="profile"
              height="30px"
              width="30px"
              className="img"
            ></img>
            <div className="acc-name">{props.user}</div>
          </div>
          <p>
            <i className="arrow down"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bar;
