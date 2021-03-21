import React from "react";
import { connect } from "react-redux";
import { getTokenState } from "../../redux/User/userSelectors";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
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
