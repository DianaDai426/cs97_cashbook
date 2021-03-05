import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  TextField,
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import CurrencyInput from 'react-currency-input-field';
import Moment from 'moment';

function CreateArea(props) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState({
    amount: 0,
    use: "",
    comment:"",
    recordId:"",
  });

  const [error, setError] = useState("");

  const [sendNote, { SendNote_error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      amount: parseFloat(note.amount),
      use: note.use,
      comments: note.comment,
      date: date? Moment(date).format("MM/DD/YYYY"): ""
    },
    update(_,result) {
      console.log(result.data);
      console.log(result.data.createRecord.id);
      console.log(note);
      note.recordId = result.data.createRecord.id;
      console.log("hello world");
      //submitNote();
    },
    onError(err){
      console.log(err.message);
      console.log(err.networkError);
      console.log(err.graphQLErrors);
      console.log(err.name);
      console.log(err.extraInfo);
    },
  })

  // function callOrder(event) {
  //   sendNote();
  //   event.preventDefault();
  // }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleDateChange(event){
    console.log("change date to", event.target.value);
    setDate(event.target.value);
  }

  
  const handleOnValueChange = (value: string | undefined): void => {
    if(value === undefined){
      value = "0";
    }
    setNote(prevNote => {
      return {
        ...prevNote,
        ["amount"]: value
      };
    });
 };

  function submitNote() {
    console.log("validating....");

    //check if valid (required fields except the commment)
    if(!note.amount || !date || !note.use){
      setError ("All fields except comment must be filled");
      return;
    }

    //if nothing is empty sent to backend
    sendNote();

    //create and add newNote to store in Home
    const newNote = {
      amount: note.amount,
      date: date? Moment(date).format('MM/DD/YYYY'): "",
      use: note.use,
      comment: note.comment,
      recordId: note.recordId,
    }
    
    props.onAdd(newNote);
    console.log("should have record in it now");
    console.log(newNote);

    //set back to default value
    setNote({
      amount: 0,
      use: "",
      comment:"",
      recordId: "",
    });
    setDate("");
    setError("");

  }

  return (
    <div>
      <form className="create-note">
        <CurrencyInput
        name = "amount"
        value={note.amount}
        onValueChange={handleOnValueChange}
        prefix="$"
        groupSeparator=""
        />
        <TextField
            id="date"
            type="date"
            defaultValue= {null}
            value = {date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange = {handleDateChange}
            InputProps={{
               disableUnderline: true,
                }}
          />
        <textarea
          name="use"
          onChange={handleChange}
          value={note.use}
          placeholder="Purpose"
          rows={1}
        />
        <textarea
          name="comment"
          onChange={handleChange}
          value={note.comment}
          placeholder="(Comment)"
          rows={1}
        />
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        {error && <Alert variant="outlined" severity="warning">{error}</Alert>}
      </form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
mutation createRecord(
  $amount: Float!
  $use: String!
  $date: String!
  $comments: String!
){
  createRecord(
    amount: $amount
    use: $use
    date: $date
    comments: $comments
  )
  {
      username
      amount
      id
  }
}
`


export default CreateArea;