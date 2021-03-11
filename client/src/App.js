import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import {AuthProvider} from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Summary from './pages/Summary';
import MenuBar from './components/MenuBar';

//#009069
const ContainerStyles = {
  background: 'linear-gradient(120deg, #f9f9f9 60%, #f9f9f9 60%)',
  width:'100vw',
  }  

export default function App() {
    return (
    <AuthProvider >
      <Router >
          <Container 
          style={ContainerStyles}>
            <MenuBar style={{ marginBotton:'0px'}}/>
            <Switch style={{margin:"100 100px"}}>
              <Route exact path="/" component={Home}></Route>
              <AuthRoute exact path='/login' component = {Login} />
              <AuthRoute exact path='/register' component = {Register} />
              <Route exact path='/summary' component = {Summary} />
            </Switch>
          </Container>
      </Router>
    </AuthProvider>
    )
}
