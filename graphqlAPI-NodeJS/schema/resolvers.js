const { UserList } = require("../fakeData")
const _ = require('lodash')

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },
        user: (_parents, args) => {
            const id = Number(args.id);
            const user = _.find(UserList, { id: id });
            return user;
        }
    }
}

module.exports = { resolvers }