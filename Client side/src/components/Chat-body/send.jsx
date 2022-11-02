import React from "react";

function Send(props) {
  return (
    <div className="d-flex send">
      <div className="message">{props.message}</div>
      <div className="arrow"></div>
    </div>
  );
}

export default Send;
