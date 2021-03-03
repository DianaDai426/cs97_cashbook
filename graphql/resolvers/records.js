const { AuthenticationError, UserInputError } = require('apollo-server');

const Record = require('../../models/Record');
const authCheck = require('../../util/auth-check');

module.exports = {
    Query: {
        //Sort by date (the latest comes first)
        //Default mode
        async getRecords(_, {userName}) {
            try {
                const records = await Record.find({ username: userName}).sort({ date: -1 });

                return records;
            } catch (err) {
                throw new Error(err);
            }
        },
        //Sort by use (alphabetical order)
        async getRecordsByUse(_, { }, context) {
            const user = authCheck(context);
            try {
                const records = await Record.find({ username: user.username }).sort({ use: 1 });
                return records;
            } catch (err) {
                throw new Error(err);
            }
        },

        //Sort by amount (increasing order)
        async getRecordsByAmountIO(_, { }, context) {
            const user = authCheck(context);
            try {
                const records = await Record.find({ username: user.username }).sort({ amount: 1 });
                return records;
            } catch (err) {
                throw new Error(err);
            }
        },

        //Sort by amount (decreasing order)
        async getRecordsByAmountDO(_, { }, context) {
            const user = authCheck(context);
            try {
                const records = await Record.find({ username: user.username }).sort({ amount: -1 });
                return records;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createRecord(_, { amount, use, date, comments }, context) {
            const user = authCheck(context);

            if (use.trim() === '') {
                throw new Error('Post body must not be empty');
            }
            if (amount === 0) {
                throw new Error('Amount should not be 0');
            }

            const newRecord = new Record({
                username: user.username,
                amount: amount,
                use: use,
                comments: comments,
                date: date,
                user: user.id
            });

            const record = await newRecord.save();

            return record;
        },

        async editRecord(_, { recordId, amount, use, date, comments }, context) {
            const user = authCheck(context);

            if (use.trim() === '') {
                throw new Error('Post body must not be empty');
            }
            if (amount === 0) {
                throw new Error('Amount should not be 0');
            }

            try {
                const record = await Record.findById(recordId);
                if (user.username === record.username) {
                    record.amount = amount;
                    record.use = use;
                    record.comments = comments;
                    record.date = date;
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
