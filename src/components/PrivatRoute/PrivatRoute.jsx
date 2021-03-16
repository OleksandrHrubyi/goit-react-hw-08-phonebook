import React from "react";
import { connect } from "react-redux";
import { getTokenState } from "../../redux/Contacts/contacts-selectors";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: getTokenState(state),
});

export default connect(mapStateToProps, null)(PrivateRoute);
