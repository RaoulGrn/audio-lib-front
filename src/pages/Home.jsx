import React, { useState } from "react";
import styled from "styled-components";
import Autocomplete from "../components/Autocomplete";
import YouTubePlayer from "../components/YoutubePlayer";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrackItem = styled.li`
  cursor: pointer;
  padding: 0.4rem 0;
  transition: background-color 0.1s ease;
  border-radius: 8px;
  text-align: center;

  &:hover {
    background-color: #476e53;
    border-radius: 16px;
    padding: 8px;
  }
`;

const TextContainer = styled.div`
  margin-top: 1.6rem;
  padding: 2.2rem;
  background-color: #123524;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextContainer2 = styled.div`
  margin-top: 1.6rem;
  padding: 1.2rem;
  background-color: #265c42;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextContainer3 = styled.div`
  margin-top: 1.6rem;
  padding: 1.2rem;
  width: 100%;
  background-color: #265c42;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Home() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleSelect = (item) => {
    setSelectedData(item);
    if (item.type === "song") {
      setSelectedTrack(item.title);
      setSelectedArtist(item.artist);
    } else {
      setSelectedTrack(null);
      setSelectedArtist(null);
    }
  };

  const handleTrackClick = (trackTitle, artistName) => {
    setSelectedTrack(trackTitle);
    setSelectedArtist(artistName);
    console.log("Track clicked:", trackTitle, artistName);
  };

  return (
    <div>
      <Autocomplete onSelect={handleSelect} />
      {selectedData && (
        <StyledContainer className="text-gray-300">
          {selectedData.type === "artist" && (
            <TextContainer>
              <h2>{selectedData.name}</h2>
              <TextContainer2>
                {selectedData.albums.map((album, index) => (
                  <div key={index}>
                    <strong>Album: {album.title}</strong>
                    <p>{album.description}</p>
                    <TextContainer>
                      <TrackList>
                        {album.songs.map((song, idx) => (
                          <TrackItem
                            key={idx}
                            onClick={() =>
                              handleTrackClick(song.title, selectedData.name)
                            }
                          >
                            {song.title} - {song.length}
                          </TrackItem>
                        ))}
                      </TrackList>
                    </TextContainer>
                  </div>
                ))}
              </TextContainer2>
            </TextContainer>
          )}
          {selectedData.type === "album" && (
            <TextContainer>
              <h2>Album: {selectedData.title}</h2>
              <p>Artist: {selectedData.artist}</p>
              <p>{selectedData.description}</p>
              <TextContainer2>
                <TrackList>
                  {selectedData.songs.map((song, index) => (
                    <TextContainer key={index}>
                      <TrackItem
                        onClick={() =>
                          handleTrackClick(song.title, selectedData.artist)
                        }
                      >
                        {song.title} - {song.length}
                      </TrackItem>
                    </TextContainer>
                  ))}
                </TrackList>
              </TextContainer2>
            </TextContainer>
          )}
          {selectedData.type === "song" && (
            <TextContainer3>
              <h2
                onClick={() =>
                  handleTrackClick(selectedData.title, selectedData.artist)
                }
                style={{ cursor: "pointer" }}
              >
                Track Name: {selectedData.title}
              </h2>
              <p>Artist: {selectedData.artist}</p>
              <p>Album: {selectedData.album}</p>
              <p>Length: {selectedData.length}</p>
            </TextContainer3>
          )}
        </StyledContainer>
      )}
      {selectedTrack && (
        <YouTubePlayer trackTitle={selectedTrack} artistName={selectedArtist} />
      )}
    </div>
  );
}

export default Home;
