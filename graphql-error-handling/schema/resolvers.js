const { UserList, MovieList } = require("../fakeData")
const _ = require('lodash')

const resolvers = {
    Query: {
        users: (parents, args, context, info) => {
            console.log(parents)  // undefined bcoz parent that is Query doesnot return anything
            return UserList;
        },
        user: (_parents, args, context, info) => {
            const id = Number(args.id);
            const user = _.find(UserList, { id: id });
            return user;
        },
        movies: () => {
            return MovieList;
        },
        movie: (_parent, args, context, info) => {
            const name = args.name;
            const movie = _.find(MovieList, { name: name });
            return movie;
        }
    },
    User: {
        favouriteMovies: (parents, args, context, info)=>{
            console.log(context)
            return _.filter(MovieList,(movie)=>movie.yearOfPublication<=2020)
        }
    },

    Mutation: {
        createUser: (_parent, args) => {
            const user = args.input
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (_parent, args) => {
            const { id, newUsername } = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user
                }
            });
            return userUpdated;
        }
    }
}

module.exports = { resolvers }