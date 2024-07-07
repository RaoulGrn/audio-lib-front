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
  flex-wrap: wrap; /* Allow flex items to wrap to next line */
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
  font-size: 1.6rem;

  &:hover {
    background-color: #0b160f;
    border-radius: 16px;
    padding: 8px;
  }
`;

const Title1 = styled.h2`
  margin-top: 1.6rem;
  font-size: 2.4rem;
  margin-bottom: 1.6rem;
`;

const Title2 = styled.h3`
  margin-top: 1.6rem;
  font-size: 2rem;
  margin-bottom: 1.6rem;
`;
const Title3 = styled.h4`
  margin-top: 1.6rem;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
`;

const TextContainer = styled.div`
  margin-top: 1.6rem;
  padding: 2.2rem;
  background-color: #0d0f0e;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextContainer2 = styled.div`
  margin-top: 1.6rem;
  padding: 1.2rem;
  background-color: #0b160f;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextContainer3 = styled.div`
  margin-top: 1.6rem;
  padding: 1.2rem;
  width: 100%;
  background-color: #0b160f;
  border-radius: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const YouTubeContainer = styled.div`
  flex-basis: 100%;
  margin-top: 1.6rem;
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
    <StyledContainer className="text-gray-300 fs-5">
      <Autocomplete onSelect={handleSelect} />
      {selectedData && (
        <>
          {selectedData.type === "artist" && (
            <TextContainer>
              <Title1>{selectedData.name}</Title1>
              <TextContainer2>
                {selectedData.albums.map((album, index) => (
                  <div key={index}>
                    <Title2>Album: {album.title}</Title2>
                    <TextContainer>
                      <Title3>{album.description}</Title3>
                    </TextContainer>
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
              <Title1>Album: {selectedData.title}</Title1>

              <TextContainer2>
                <Title2>Artist: {selectedData.artist}</Title2>
              </TextContainer2>
              <Title3>{selectedData.description}</Title3>
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
              <Title1
                onClick={() =>
                  handleTrackClick(selectedData.title, selectedData.artist)
                }
                style={{ cursor: "pointer" }}
              >
                Track Name: {selectedData.title}
              </Title1>
              <Title2>Artist: {selectedData.artist}</Title2>
              <Title3>Album: {selectedData.album}</Title3>
              <p>Length: {selectedData.length}</p>
            </TextContainer3>
          )}
        </>
      )}
      {selectedTrack && (
        <YouTubeContainer>
          <YouTubePlayer
            trackTitle={selectedTrack}
            artistName={selectedArtist}
          />
        </YouTubeContainer>
      )}
    </StyledContainer>
  );
}

export default Home;
