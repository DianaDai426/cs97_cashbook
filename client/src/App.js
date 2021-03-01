import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
    return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path='/login' component = {Login}></Route>
          <Route exact path='/register' component = {Register}></Route>
        </Switch>
    </Router>
    )
}
