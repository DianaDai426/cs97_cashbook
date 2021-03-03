import React, { useContext, useState} from "react";
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

  const {loading, data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY, {
    variables: { userName }
  });
  if(records){
    console.log(records);
    records.forEach(function(item){
      arr.push({amount : item.amount,
                date : item.date,
                use : item.use,
                comment: item.comments,
              });
    });
    console.log(arr);
  }

  //console.log(arr);
  const [notes, setNotes] = useState(arr);

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
  query($userName: String!) {
    getRecords(userName: $userName){
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
