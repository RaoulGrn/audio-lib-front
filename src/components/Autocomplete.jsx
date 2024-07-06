import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash.debounce";

const StyledSearchContainer = styled.div`
  position: relative;
  width: 100%;
  color: #123524;
  margin: 1rem 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #123524;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  outline: none;
  margin-bottom: 2rem;

  &:focus {
    border-color: #dbad13;
  }
`;

const StyledSuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const StyledSuggestionItem = styled.li`
  padding: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LoadingMessage = styled.p`
  margin: 0.5rem 0;
  color: #007bff;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  margin: 0.5rem 0;
  color: red;
  font-size: 0.9rem;
`;

function Autocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sanitize input to prevent injection attacks
  const sanitizeInput = (input) => {
    return input.replace(/[^\w\s]/gi, "");
  };

  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (value.length > 1) {
        setLoading(true);
        setError(null);

        try {
          const sanitizedValue = sanitizeInput(value);
          const artistsResponse = await axios.get(
            `http://localhost:3000/artists`
          );

          const suggestions = [];

          artistsResponse.data.forEach((artist) => {
            if (
              artist.name.toLowerCase().includes(sanitizedValue.toLowerCase())
            ) {
              suggestions.push({ ...artist, type: "artist" });
            }

            artist.albums.forEach((album) => {
              if (
                album.title.toLowerCase().includes(sanitizedValue.toLowerCase())
              ) {
                suggestions.push({
                  ...album,
                  type: "album",
                  artist: artist.name,
                });
              }

              album.songs.forEach((song) => {
                if (
                  song.title
                    .toLowerCase()
                    .includes(sanitizedValue.toLowerCase())
                ) {
                  suggestions.push({
                    ...song,
                    type: "song",
                    artist: artist.name,
                    album: album.title,
                  });
                }
              });
            });
          });

          setSuggestions(suggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setError(
            "An error occurred while fetching suggestions. Please try again."
          );
        }

        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name || suggestion.title);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <StyledSearchContainer>
      <StyledInput
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search artists, albums, or songs..."
      />
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {suggestions.length > 0 && (
        <StyledSuggestionsList>
          {suggestions.map((suggestion, index) => (
            <StyledSuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name || suggestion.title} ({suggestion.type})
              {suggestion.type === "song" && ` - ${suggestion.artist}`}
            </StyledSuggestionItem>
          ))}
        </StyledSuggestionsList>
      )}
    </StyledSearchContainer>
  );
}

export default Autocomplete;
