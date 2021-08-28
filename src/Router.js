import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";

export default function Router() {
    return (
        <Switch>
            <Route exact path= {['','/']} component={Home}/>
            <Route exact path="/list" component={List}/>
        </Switch>
    )
}