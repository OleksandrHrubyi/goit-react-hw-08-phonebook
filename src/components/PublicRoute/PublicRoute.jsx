import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getTokenState } from "../../redux/Contacts/contacts-selectors";

const PublicRoute = ({
  component: Component,
  isLogin,
  restricted,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to="/contacts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLogin: getTokenState(state),
});

export default connect(mapStateToProps)(PublicRoute);
