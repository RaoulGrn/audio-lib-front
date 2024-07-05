import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
`;

function Home() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/artists")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  };

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={fetchData}>Fetch Artists</button>
      <StyledContainer>
        <ul>
          {data.map((artist, index) => (
            <li key={index}>{artist.name}</li>
          ))}
        </ul>
        <ul>
          {data.map((artist, index) =>
            artist.albums.map((album, index) => (
              <li key={index}>{album.title}</li>
            ))
          )}
        </ul>
        <ul>
          {data.map((artist, index) =>
            artist.albums.map((album, index) =>
              album.songs.map((song, index) => (
                <li key={index}>{song.title}</li>
              ))
            )
          )}
        </ul>
      </StyledContainer>
    </div>
  );
}

export default Home;
