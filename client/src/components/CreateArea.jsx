import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  Zoom,
  InputLabel,
  InputAdornment,
  Input,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Alert from '@material-ui/lab/Alert';

function CreateArea(props) {
  //const [isExpanded, setExpanded] = useState(false);
  const [date, setDate] = useState("");
  const [note, setNote] = useState({
    amount: 0,
    date: "", 
    use: "", 
    comment:"",
  });

  const [error, setError] = useState(""); 

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    //check if valid (required fields except the commment)
    if(!note.amount || !note.date || !note.use){
      setError ("All fields except comment must be filled");
      return;
    }

    props.onAdd(note);
    setNote({
      amount: "",
      date: "", 
      use: "",
      comment:"",
    });
    setError("");
    event.preventDefault();
  }

  // function expand() {
  //   setExpanded(true);
  // }

  return (
    <div>
      <form className="create-note">
        {/* <textarea
          name="amount"
          // onClick={expand}
          onChange={handleChange}
          value={note.amount}
          placeholder="Amount" 
          startAdornment = {<p>$</p>}
          rows={1}
        />        */}
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            name = "amount"
            id="standard-adornment-amount"
            value={note.amount==0 ? "": note.amount}
            onChange={handleChange}
            disableUnderline
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        <textarea
          name="date"
          // onClick={expand}
          onChange={handleChange}
          value={note.date}
          placeholder="Date"
          rows={1}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          name="date"
          disableUnderline
          clearable
          value={date}
          placeholder="10/10/2018"
          onChange={date => setDate(date)}
          maxDate={new Date()} 
          format="MM/dd/yyyy"
        />          
        </MuiPickersUtilsProvider> */}


        <textarea
          name="use"
          // onClick={expand}
          onChange={handleChange}
          value={note.use}
          placeholder="Use"
          rows={1}
        />
        <textarea
          name="comment"
          // onClick={expand}
          onChange={handleChange}
          value={note.comment}
          placeholder="Comment"
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

export default CreateArea;
