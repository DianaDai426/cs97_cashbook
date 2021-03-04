import React, { useContext, useState, useEffect} from "react";
import Header from "../components/Header";
import Note from "../components/Entry";
import CreateArea from "../components/CreateArea";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';
import { Grid } from "@material-ui/core";
import { useMutation } from '@apollo/react-hooks';


function Home() {
  const {user} = useContext(AuthContext);

  let arr = [];
  const [notes, setNotes] = useState([]);

  const [deleteRecord] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      recordId: notes.recordId,
    },
    onError(err)
    {
      console.log(err);
    },
  })

  /*
  function DefaultRecords() {
    const {loading, data: { getRecordsByUse : records} = {}} = useQuery(FETCH_RECORDSUSE_QUERY);
    return records;
  }
  */

  const {loading, data: { getRecords : records} = {}} = useQuery(FETCH_RECORDS_QUERY);

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

  React.useEffect(() => {
      if (records){
        setNotes(arr);
    }
  }, [records])


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

const DELETE_POST_MUTATION = gql`
mutation deleteRecord(
  $recordId: ID!
){
  deleteRecord(
    recordId: $recordId
  )
}
`

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
