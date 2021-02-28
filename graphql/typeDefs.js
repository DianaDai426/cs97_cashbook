const { gql } = require('apollo-server');

module.exports = gql`
  type Record {
    id: ID!
    username: String!
    amount: Float!
    use: String!
    comments: String!
    date: String!
  }
  type User {
    id: ID!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getRecords: [Record]
    getRecordsByUse: [Record]
    getRecordsByAmountIO: [Record]
    getRecordsByAmountDO: [Record]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createRecord(amount: Float!, use: String!, date: String!, comments: String!): Record!
    editRecord(recordId: ID!, amount: Float!, use: String!, date: String!, comments: String!): String!
    deleteRecord(recordId: ID!): String!
  }
`;
