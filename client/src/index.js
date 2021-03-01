import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloProvider from './ApolloProvider'


//ApolloProvider will call App() instead
ReactDOM.render(ApolloProvider, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById("root"));
