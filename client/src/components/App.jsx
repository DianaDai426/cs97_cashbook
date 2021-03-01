import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import Login from './Login';

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
