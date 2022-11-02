import Button from "./buttons";
import "./Side-bar.scss";

function Left(props) {
  return (
    <div className="left-cont left">
      <center>
        <button className="btns">
          {" "}
          <i className="fas fa-plus"></i> Add Post
        </button>
      </center>
      <h3>Menu</h3>
      <Button type="Home" />
      <Button type="Profile" />
      <Button type="Saved Post" />
      <Button type="Explore" />
      <center>
        <button className="btns" onClick={props.Logout}>
          {" "}
          Logout
        </button>
      </center>
    </div>
  );
}

export default Left;
