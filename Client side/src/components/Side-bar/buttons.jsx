function Button(props) {
  const addstyle = (e) => {
    if (document.querySelectorAll(".btn-leftx").length === 1) {
      document.querySelector(".btn-leftx").classList.remove("btn-leftx");
    }
    e.target.classList.add("btn-leftx");
  };
  return (
    <div className="sidebarWrapper">
      <button type="button" onClick={addstyle} className="btn-left ">
        {props.type}
      </button>
    </div>
  );
}
export default Button;
