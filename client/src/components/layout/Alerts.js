import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertItem from "./AlertItem";

const Alerts = ({ alerts }) => {
  return (
    <div className="alerts">
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

Alerts.propTypes = {};

const mapStateToProps = state => ({
  alerts: state.alert.alerts
});

export default connect(mapStateToProps, {})(Alerts);
