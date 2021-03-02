import React, { useState } from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";


function Home() {
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

export default Home;
