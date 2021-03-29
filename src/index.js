import ReactDOM from "react-dom";
import App from "./components/App/App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import "index.css";

ReactDOM.render(
  <Provider store={store}>
    "use strict"
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);

// var s = "myteststring";
// console.log(s.split(",", 6));

// let x = 5;
// x = (x++, (x = addFive(x)), (x *= 2), (x -= 5), (x += 10));

// function addFive(num) {
//   return num + 5;
// }
// console.log(x);

// class Something {}
// function AnotherSomething() {}

// const as = new AnotherSomething();
// const s = new Something();

// console.log(as.toString === Object.prototype.toString);
// console.log(s.toString === Object.prototype.toString);
