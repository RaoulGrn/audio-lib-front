import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash.debounce";

const StyledSearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledSuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledSuggestionItem = styled.li`
  padding: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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
          const [artistsResponse, albumsResponse, songsResponse] =
            await Promise.all([
              axios.get(
                `http://localhost:3000/artists/search?name=${sanitizedValue}`
              ),
              axios.get(
                `http://localhost:3000/albums/search?title=${sanitizedValue}`
              ),
              axios.get(
                `http://localhost:3000/songs/search?title=${sanitizedValue}`
              ),
            ]);

          const uniqueSuggestions = new Map();

          artistsResponse.data.forEach((artist) => {
            uniqueSuggestions.set(artist.name, { type: "artist", ...artist });
          });

          albumsResponse.data.forEach((album) => {
            if (!uniqueSuggestions.has(album.title)) {
              uniqueSuggestions.set(album.title, { type: "album", ...album });
            }
          });

          songsResponse.data.forEach((song) => {
            if (!uniqueSuggestions.has(song.title)) {
              uniqueSuggestions.set(song.title, { type: "song", ...song });
            }
          });

          setSuggestions(Array.from(uniqueSuggestions.values()));
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
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {suggestions.length > 0 && (
        <StyledSuggestionsList>
          {suggestions.map((suggestion, index) => (
            <StyledSuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name || suggestion.title} ({suggestion.type})
            </StyledSuggestionItem>
          ))}
        </StyledSuggestionsList>
      )}
    </StyledSearchContainer>
  );
}

export default Autocomplete;
