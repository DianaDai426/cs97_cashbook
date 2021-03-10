import React, { useContext, useState, useEffect} from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/client';
import {AuthContext} from '../context/auth';
import { Grid } from "@material-ui/core";
import { Button, Dropdown } from 'semantic-ui-react'
import { FETCH_RECORDS_QUERY, FETCH_RECORDSUSE_QUERY,
  FETCH_RECORDSAMOUNTIO_QUERY, FETCH_RECORDSAMOUNTDO_QUERY } from '../util/graphql';



function Home(props) {
  const {user} = useContext(AuthContext);


  const [notes, setNotes] = useState([]);

  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]

  /*default records*/
  const  {data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(records){
          records.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.id,
                      userName: item.username
                    });
          });
        }
        setNotes([...arr]);
    }
  });

  /*Sort by date (the latest comes first)*/
  const  [recordDate,{data: { getRecords : recordsDate} = {}}] = useLazyQuery(FETCH_RECORDS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(recordsDate){
          recordsDate.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.id,
                      userName: item.username
                    });
          });
        }
        setNotes(arr);
    }
  });

  /* fetch by Use*/
  const  [recordUse,{data: { getRecordsByUse : recordsUse} = {}}] = useLazyQuery(FETCH_RECORDSUSE_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(recordsUse){
          recordsUse.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.id,
                      userName: item.username
                    });
          });
        }
        setNotes(arr);
    }
  });

  /*Sort by amount (increasing order)*/
  const  [recordAmIO,{data: { getRecordsByAmountIO : recordsAmIO} = {}}] = useLazyQuery(FETCH_RECORDSAMOUNTIO_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(recordsAmIO){
          recordsAmIO.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.id,
                      userName: item.username
                    });
          });
        }
        setNotes(arr);
    }
  });

  /* Sort by amount (decreasing order) */
  const  [recordAmDO,{data: { getRecordsByAmountDO : recordsAmDO} = {}}] = useLazyQuery(FETCH_RECORDSAMOUNTDO_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(recordsAmDO){
          recordsAmDO.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.id,
                      userName: item.username
                    });
          });
        }
        setNotes(arr);
    }
  });

  function summaryButton() {
    console.log('clicked sumamry');
    props.history.push('/summary');
  }


  function addNote(newNote) {
    setNotes([newNote, ...notes ])
    }





  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="App">
      <Header />
      {!user && (
        <div className="introduction">
        <h1 className="title-one">Track your Spending Easy and Fast</h1>
        <h2 className="title-two">
        Simple and powerful, CashBook gives you the tools and intelligence to control over your finance situation. 
        </h2>
        <Button className="get-started" color="green">Get Started</Button>
        </div>



      )}
      {user && (
          <CreateArea onAdd={addNote} />
      )}
      <div id="operations">
        {user && (
          <Dropdown 
          text='Sort by'
          style={{color:'green'}}
          >
            <Dropdown.Menu>
              <Dropdown.Item text='Date' description = 'default' onClick = {recordDate} />
              <Dropdown.Item text='Purpose' description = 'alphabetical' onClick = {recordUse} />
              <Dropdown.Item text='Amount' description = '(Increasing)' onClick = {recordAmIO} />
              <Dropdown.Item text='Amount' description = '(Decreasing)' onClick = {recordAmDO} />
            </Dropdown.Menu>
          </Dropdown>
        )}
        {user && (
            <button className="ui right floated olive button" onClick={summaryButton}>Summary</button>
        )}
      </div>


      <div className="note-board">
      {user && (notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              amount={noteItem.amount}
              date={noteItem.date}
              use = {noteItem.use}
              comment = {noteItem.comment}
              recordId = {noteItem.recordId}
              userName = {noteItem.userName}
              onDelete={deleteNote}
            />
          );
        })
      )}
      </div>
    </div>
  );
}




export default Home;
