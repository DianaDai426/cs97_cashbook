import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  Zoom,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Alert from '@material-ui/lab/Alert';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
function CreateArea(props) {
  //const [isExpanded, setExpanded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState({
    amount: 0,
    use: "",
    comment:"",
    recordId:"asdf",
  });

  const [error, setError] = useState("");

  const [sendNote, { SendNote_error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      //amount: parseFloat(note.amount),
      amount: parseFloat(note.amount),
      use: note.use,
      comments: note.comment,
      date: date.toLocaleDateString(),
    },
    update(_,result) {
      console.log(result.data);
      console.log(result.data.createRecord.id);
      console.log(note);
      note.recordId = result.data.createRecord.id;
      console.log(note);
      submitNote();
    },
    onError(err){
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

  function submitNote(event) {
    console.log("submitting....");
    //check if valid (required fields except the commment)
    if(!note.amount || !date || !note.use){
      setError ("All fields except comment must be filled");
      return;
    }

    const newNote = {
      amount: note.amount,
      date : note.date,
      //date: date.toLocaleDateString(),
      use: note.use,
      comment: note.comment,
      recordId: note.recordId,
    }
    
    props.onAdd(newNote);
    
    console.log("should have record in it now");
    console.log(newNote);

    setNote({
      amount: 0,
      use: "",
      comment:"",
    });
    setDate(new Date());
    setError("");

    event.preventDefault();
  }



  return (
    <div>
      <form className="create-note">
        {/* <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> */}
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
            defaultValue= {date}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
               disableUnderline: true,
               min: "2021-03-01",
               max: "2021-03-03",
                }}
          />
        <textarea
          name="use"
          // onClick={expand}
          onChange={handleChange}
          value={note.use}
          placeholder="Purpose"
          rows={1}
        />
        <textarea
          name="comment"
          // onClick={expand}
          onChange={handleChange}
          value={note.comment}
          placeholder="(Comment)"
          rows={1}
        />
          <Fab onClick={sendNote}>
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
