import React, { useContext} from "react";
import Header from "../components/Header";
import {AuthContext} from '../context/auth';



function Summary(props) {
  const {user} = useContext(AuthContext);




  return (
    <div>
      <Header />

    </div>
  );

}


export default Summary;
