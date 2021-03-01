import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
    return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path='/login' component = {Login}></Route>
        </Switch>
    </Router>
    )
}
