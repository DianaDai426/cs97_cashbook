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
import Select from 'react-select';

function CreateArea(props) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState({
    amount: 0,
    use: "",
    comment:"",
    recordId:"",
  });


  const [error, setError] = useState("");
  const [someVal, setSomeVal] = useState('')
  /*for the purpose form*/
  const options = [
      { value: "food", label: "Food" },
      { value: "clothing", label: "Clothing" },
      { value: "housing", label: "Housing" },
      { value: "health", label: "Health" },
      { value: "transport", label: "Transportation" },
      { value: "entertainment", label: "Entertainment" },
      { value: "other", label: "Other" },
    ];


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
      submitNote();
    },
    onError(err){
      console.log("validating....");

      //check if valid (required fields except the commment)
      if(!note.amount || !date || !note.use){
        setError ("All fields except comment must be filled");
        return;
      }
      console.log(err.message);
      console.log(err.networkError);
      console.log(err.graphQLErrors);
      console.log(err.name);
      console.log(err.extraInfo);
    },
  })


  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleUseChange(event) {
    var value = event.value;
    setSomeVal(value);
    setNote(prevNote => {
      return {
        ...prevNote,
        ["use"]: value
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
    //sendNote(); //latest

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
      use: someVal,
      comment:"",
      recordId: "",
    });
    setDate("");
    setError("");

  }

  return (
    <div>
      <form className="create-note">
      <div className="create-note-block">
        <CurrencyInput
        name = "amount"
        value={note.amount}
        onValueChange={handleOnValueChange}
        prefix="$"
        groupSeparator=""
        // style={{backgroundColor:'#d8f3dc'}}
        />        
      </div>

      <div className="create-note-block">
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
      </div>

        <div className="create-note-block">
          {/* <label>Purpose: </label> */}
          <Select
             name="use"
             defaultValue={{ label: "Purpose", value: someVal }}
             onChange={handleUseChange}
             options={options}
           />
        </div>

        <div className="create-note-block">
        <textarea
          name="comment"
          onChange={handleChange}
          value={note.comment}
          placeholder="(Comment)"
          rows={1}
          background= 'black'
        />
        {error && <Alert variant="outlined" severity="warning">{error}</Alert>}        
        </div>


          <Fab onClick={sendNote} style={{backgroundColor:'rgb(0,144,105)'}}>
            <AddIcon />
          </Fab>

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
