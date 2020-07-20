import React from "react";

const Image = (props) => {
  const style = {
    maxWidth: "100%",
    maxHeight: "100%",
  };
  return <img style={style} src={props.img} alt="grafika"></img>;
};

export default Image;
