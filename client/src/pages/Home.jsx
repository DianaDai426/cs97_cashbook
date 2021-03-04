import React, { useContext, useState, useEffect} from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/client';
import {AuthContext} from '../context/auth';
import { Grid } from "@material-ui/core";
import { Dropdown, MenuItem} from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { FETCH_RECORDS_QUERY, FETCH_RECORDSUSE_QUERY,
  FETCH_RECORDSAMOUNTIO_QUERY, FETCH_RECORDSAMOUNTDO_QUERY } from '../util/graphql';



function Home() {
  const {user} = useContext(AuthContext);


  const [notes, setNotes] = useState([]);

  /*default records*/
  const  {data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(){
        //console.log('fuck you')
        let arr = [];
        if(records){
          records.forEach(function(item){
            arr.push({amount : item.amount,
                      date : item.date,
                      use : item.use,
                      comment: item.comments,
                      recordId: item.recordId,
                      userName: item.userName
                    });
          });
        }
        setNotes(arr);
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
                      recordId: item.recordId,
                      userName: item.userName
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
                      recordId: item.recordId,
                      userName: item.userName
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
                      recordId: item.recordId,
                      userName: item.userName
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
                      recordId: item.recordId,
                      userName: item.userName
                    });
          });
        }
        setNotes(arr);
    }
  });



  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }




  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      {user && (
          <CreateArea onAdd={addNote} />
      )}
      <DropdownButton id="sortby-dropdown" title="Sort by">
        <Dropdown.Item as="button" onClick = {recordDate}>Date (default)</Dropdown.Item>
        <Dropdown.Item as="button" onClick = {recordUse}>By purpose</Dropdown.Item>
        <Dropdown.Item as="button" onClick = {recordAmIO}>Amount (increasing)</Dropdown.Item>
        <Dropdown.Item as="button" onClick = {recordAmDO}>Amount (decreasing)</Dropdown.Item>
      </DropdownButton>

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
  );
}




export default Home;
