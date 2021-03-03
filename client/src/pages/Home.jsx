import React, { useContext, useState, useEffect} from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';
import { Grid } from "@material-ui/core";



function Home() {
  const {user} = useContext(AuthContext);
  const userName = user ? user.username : '';

  let arr = [];
  const [notes, setNotes] = useState(arr);

/*
  const {loading, data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY, {
    variables: { userName }
  });
  */
  const {loading, data: { getRecordsByUse : records} = {}} = useQuery(FETCH_RECORDSUSE_QUERY);
  console.log(records);
  if(records){
    records.forEach(function(item){
      arr.push({amount : item.amount,
                date : item.date,
                use : item.use,
                comment: item.comments,
              });
    });
  }

  React.useEffect(() => {
      if (records){
        setNotes(arr);
    }
  }, [records])

/*
  function DefaultRecord(userName){
    const {loading, data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY, {
      variables: { userName }
    });
    return records;
  }
*/

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


      {(notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              amount={noteItem.amount}
              date={noteItem.date}
              use = {noteItem.use}
              comment = {noteItem.comment}
              onDelete={deleteNote}
            />
          );
        })
      )}
    </div>
  );
}

export const FETCH_RECORDS_QUERY = gql`
  {
    getRecords{
      id
      username
      amount
      use
      comments
      date
    }
  }
`;

export const FETCH_RECORDSUSE_QUERY = gql`
  {
    getRecordsByUse{
      id
      username
      amount
      use
      comments
      date
    }
  }
`;


export default Home;
