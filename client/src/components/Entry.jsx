import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import Moment from 'moment';


  const amountStyle ={
    fontSize: '20px',
  };

  const dateStyle ={
    fontSize: '20px',
    fontWeight:'bold',
    marginBottom: '0'
  };

  const yearStyle ={
    fontSize: '15px',
    color:'gray'
  }
  const UseStyle ={
    fontSize: '20px',
  }

  const itemStyle ={
    width: '150px',
  }
  const CommentStyle ={
    fontSize: '15px',
    color: 'grey'
  }
  const CommentBoxStyle ={
    width: '250px'
  }
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
    <table>
      <tr>
        <th style={itemStyle}>
          <p style={dateStyle}>{Moment(props.date).format('MMM D')}</p>
          <p style={yearStyle}>{Moment(props.date).format('YYYY')}</p>    
        </th>
        <th style={itemStyle}>
          <h1 style={amountStyle}>{"$"}{props.amount}</h1>
        </th>
        <th style={itemStyle}>
          <p style={UseStyle}>{props.use}</p>
        </th>
        <th style={CommentBoxStyle}>
          <p style={CommentStyle}>{props.comment}</p>          
        </th>
        <th>
      <button style={{}} onClick={handleClick}>
        <DeleteIcon />
      </button>          
        </th>
      </tr>
    </table>


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
