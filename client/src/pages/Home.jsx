import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";

import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';


function Home() {
  const {user} = useContext(AuthContext);
  const [notes, setNotes] = useState([]);


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
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            company={noteItem.company}
            amount={noteItem.amount}
            date={noteItem.date}
            onDelete={deleteNote}
          />
        );
      })}
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
