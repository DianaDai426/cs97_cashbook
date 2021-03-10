import gql from 'graphql-tag'

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

export const FETCH_RECORDSAMOUNTIO_QUERY = gql`
  {
    getRecordsByAmountIO{
      id
      username
      amount
      use
      comments
      date
    }
  }
`;

export const FETCH_RECORDSAMOUNTDO_QUERY = gql`
  {
    getRecordsByAmountDO{
      id
      username
      amount
      use
      comments
      date
    }
  }
`;

export const FETCH_SUMMARY = gql`
  {
    getSummary{
      food
      clothing
      housing
      health
      transport
      entertainment
      other
      sum
    }
  }
`;
