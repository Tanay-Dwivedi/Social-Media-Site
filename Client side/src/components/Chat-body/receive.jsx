import React from "react";

function Receive(props) {
  return (
    <div className="d-flex receive">
      <div className="arrow"></div>
      <div className="message">{props.message}</div>
    </div>
  );
}

export default Receive;
