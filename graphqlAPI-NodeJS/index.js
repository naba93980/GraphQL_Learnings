const { ApolloServer } = require("apollo-server");
const { typeDefs } = require('./schema/type-defs');
const {resolvers} = require('./schema/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
console.log(server);

server.listen(5000).then(({ url }) => {
    console.log(`App is running at ${url}`);
}).catch((err)=>{
    console.log("cannot start");
})
