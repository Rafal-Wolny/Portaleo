import React from "react";

import "./toggleButton.css";

const ToggleButton = props => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </button>
  );
};

export default ToggleButton;
