import React, { useState } from "react";
import styled from "styled-components";
import Autocomplete from "../components/Autocomplete";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
`;

function Home() {
  const [selectedData, setSelectedData] = useState(null);
  console.log(selectedData);
  const handleSelect = (item) => {
    setSelectedData(item);
  };

  return (
    <div>
      <h1>HOME</h1>
      <Autocomplete onSelect={handleSelect} />
      {selectedData && (
        <StyledContainer>
          {selectedData.type === "artist" && (
            <div>
              <h2>{selectedData.name}</h2>
              <ul>
                {selectedData.albums.map((album, index) => (
                  <li key={index}>
                    <strong>{album.title}</strong> ({album.year})
                    <ul>
                      {album.songs.map((song, idx) => (
                        <li key={idx}>
                          {song.title} - {song.length}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedData.type === "album" && (
            <div>
              <h2>{selectedData.title}</h2>
              <ul>
                {selectedData.songs.map((song, index) => (
                  <li key={index}>
                    {song.title} - {song.length}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedData.type === "song" && (
            <div>
              <h2>{selectedData.title}</h2>
              <p>Length: {selectedData.length}</p>
            </div>
          )}
        </StyledContainer>
      )}
    </div>
  );
}

export default Home;
