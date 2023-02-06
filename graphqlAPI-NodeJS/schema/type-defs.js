const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favouriteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!

    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        movies: [Movie!]!
        movie(name:String!):Movie!
    }

    input CreateMovieInput {
        name: String! 
        yearOfPublication: Int! 
        isInTheaters: Boolean!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = INDIA
        # friends: [CreateUserInput!]
        # favouriteMovies: [CreateMovieInput!]
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
    }

    enum Nationality {
        CANADA,
        BRAZIL,
        INDIA,
        GERMANY,
        CHILE,
    }
`

module.exports = {typeDefs}