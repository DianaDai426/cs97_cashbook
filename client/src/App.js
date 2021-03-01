import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

export default function App() {
    return (
    <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path='/login' component = {Login}></Route>
            <Route exact path='/register' component = {Register}></Route>
          </Switch>
        </Container>
    </Router>
    )
}
