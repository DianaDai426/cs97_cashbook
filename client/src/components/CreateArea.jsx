import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    company: "",
    amount: "",
    date: "", 
  });

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
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">

          <input
            name="company"
            onChange={handleChange}
            value={note.title}
            placeholder="Company"
          />
        
        {isExpanded && (
        <textarea
          name="amount"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Amount"
          rows={isExpanded ? 1 : 0}
        />        )}
        <textarea
          name="date"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Date"
          rows={isExpanded ? 1 : 0}
        />




        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
