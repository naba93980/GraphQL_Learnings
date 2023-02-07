import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      nationality
      friends {
        id
        name
        nationality
      }
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    movie(name: $name){
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
      nationality
      username
    }
  }
`

export default function DisplayData() {

  const { data: { users = [] } = [], loading, refetch } = useQuery(QUERY_ALL_USERS);
  const [fetchmovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [movieSearched, setMovieSearched] = useState("");
  const [createUserMutation] = useMutation(CREATE_USER, {
    onCompleted: refetch()
  });

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");


  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>

      <div>
        <input type="text" placeholder="Name..." onChange={(e) => { setName(e.target.value) }} />
        <input type="text" placeholder="Username..." onChange={(e) => { setUsername(e.target.value) }} />
        <input type="number" placeholder="Age..." onChange={(e) => { setAge(Number(e.target.value)) }} />
        <input type="text" placeholder="Nationality..." onChange={(e) => { setNationality(e.target.value.toUpperCase()) }} />
        <button onClick={()=>createUserMutation({
        variables: {
          input: {
            name,
            username,
            age,
            nationality,
          }
        }
        })}> Create User </button>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h3>
              {user.name} from {user.nationality}{" "}
              {user.friends &&
                user.friends.map((friend) => {
                  return (
                    <div key={friend.id}>
                      {friend.name} in {friend.nationality}
                    </div>
                  );
                })}
            </h3>
          </div>
        );
      })}

      <div>
        <input type="text" placeholder="movie here..." onChange={(e) => { setMovieSearched(e.target.value) }} />
        <button onClick={() => {
          fetchmovie(({
            variables: {
              name: movieSearched
            }
          }))
        }}> Fetch Data</button>
      </div>

      {movieSearchedData &&
        <div>
          <h1>MovieName: {movieSearchedData.movie.name}</h1>
          <h1>YOP: {movieSearchedData.movie.yearOfPublication}</h1>
        </div>
      }

      {
        movieError &&
        <h2>There is some error fetching data</h2>
      }
    </div>
  )
}