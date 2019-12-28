import React from "react";
import spinner from "./spinner.gif";

const Spinner = props => {
  return (
    <div class="d-flex">
      <h1 className="text-center">Loading....</h1>
    </div>
  );
};

const spinnerStyles = {
  width: "300px",
  background: "transparent"
};

export default Spinner;
