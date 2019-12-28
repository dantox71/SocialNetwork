import React from "react";
import spinner from "./spinner.gif";

const Spinner = props => {
  return (
    <div>
      <h1 class="text-lg text-white ">Loading....</h1>
    </div>
  );
};

const spinnerStyles = {
  width: "300px",
  background: "transparent"
};

export default Spinner;
