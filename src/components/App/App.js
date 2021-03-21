import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import Container from "../Container/Container";
import PublicRoute from "../PublicRoute/PublicRoute";
import PrivatRoute from "../PrivatRoute/PrivatRoute";
import { refreshUser } from "../../redux/User/userOperation";

const Main = React.lazy(() => import("../Main/Main"));
const Home = React.lazy(() => import("../Home/Home"));
const Login = React.lazy(() => import("../Login/Login"));
const Registr = React.lazy(() => import("../Registr/Registr"));

class App extends React.Component {
  componentDidMount() {
    this.props.onRefreshUser();
  }

  render() {
    return (
      <>
        {" "}
        <Header />
        <Container>
          <Suspense fallback={<p>Loud...</p>}>
            <Switch>
              <PublicRoute restricted exact path="/login" component={Login} />
              <PublicRoute
                restricted
                exact
                path="/registr"
                component={Registr}
              />

              <PrivatRoute component={Main} path="/contacts" exact />
              <PublicRoute restricted path="/" component={Home} />
            </Switch>
          </Suspense>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = {
  onRefreshUser: refreshUser,
};

export default connect(null, mapDispatchToProps)(App);
