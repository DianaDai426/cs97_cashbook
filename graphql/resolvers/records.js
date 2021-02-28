const { AuthenticationError, UserInputError } = require('apollo-server');

const Record = require('../../models/Record');
const authCheck = require('../../util/auth-check');

module.exports = {
  Query: {
      async getRecords(_, {}, context) {
        const user = authCheck(context);
          try {
              const records = await Record.find({username: user.username}).sort({ createdAt: -1 });
              return records;
          } catch (err) {
              throw new Error(err);
          }
      },
  },
  Mutation: {
      async createRecord(_, { amount, use, comments }, context){
        const user = authCheck(context);

        if (use.trim() === '') {
            throw new Error('Post body must not be empty');
          }

        const newRecord = new Record({
            username: user.username,
            amount: amount,
            use: use,    
            comments: comments,
            createdAt: new Date().toISOString(),
            user: user.id
        });

        const record = await newRecord.save();

        return record;
      },

      async editRecord(_, { recordId, amount, use, comments }, context) {
          const user = authCheck(context);

          try {
              const record = await Record.findById(recordId);
              if (user.username === record.username) {
                  record.amount = amount;
                  record.use = use;
                  record.comments = comments;
                  record.createAt = new Date().toISOString();
                  await record.save();
                  return 'Record changed successfully';
              } else {
                  throw new AuthenticationError('Action not allowed');
              }
          } catch (err) {
              throw new Error(err);
          }
      },

      async deleteRecord(_, { recordId }, context) {
        const user = authCheck(context);

        try {
            const record = await Record.findById(recordId);
            if (user.username === record.username) {
                await record.delete();
                return 'Record deleted successfully';
            } else {
                throw new AuthenticationError('Action not allowed');
            }
        } catch (err) {
            throw new Error(err);
        }
    }
  }
};