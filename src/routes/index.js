import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Home from "../pages/home";
import Cart from "../pages/cart";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;