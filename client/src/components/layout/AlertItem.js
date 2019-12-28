import React, { Fragment } from "react";
import PropTypes from "prop-types";

const AlertItem = ({ alert }) => {
  return (
    <Fragment>
      <div className={`alert alert-${alert.type}`}>
        <h3>
          {alert.msg}
          <i className="fa fa-check"></i>
        </h3>
      </div>
    </Fragment>
  );
};

export default AlertItem;
