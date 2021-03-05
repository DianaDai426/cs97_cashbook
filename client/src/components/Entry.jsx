import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';


function Note(props) {
  const [deleteRecord] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      recordId: props.recordId,
    },
    onError(err)
    {
      console.log(err);
    },
  })

  function handleClick() {
    props.onDelete(props.id);
    console.log(props.recordId);
    deleteRecord();
  }

  return (
    <div className="note">
      <h1>{props.amount}</h1>
      <p>{props.date}</p>
      <p>{props.use}</p>
      <p>{props.comment}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
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


export default Note;
