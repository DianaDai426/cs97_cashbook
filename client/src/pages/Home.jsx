import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';
import { Grid } from "@material-ui/core";


function Home() {
  const {user} = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  const {loading, data} = useQuery(FETCH_RECORDS_QUERY);

  if(data)
  {
    console.log(data)
  }

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
    getRecords {
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
