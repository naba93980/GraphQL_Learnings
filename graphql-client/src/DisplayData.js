import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

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

export default function DisplayData() {

  const { data: { users = [] } = [], loading } = useQuery(QUERY_ALL_USERS);
  const [fetchmovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [movieSearched, setMovieSearched] = useState("")


  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>

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
        <button onClick={()=>{fetchmovie(({
          variables: {
            name: movieSearched
          }
        }))}}> Fetch Data</button>
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

