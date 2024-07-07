import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash.debounce";
import { useAuthContext } from "../utils/AuthContext";
import toast from "react-hot-toast";

const StyledSearchContainer = styled.div`
  position: relative;
  width: 100%;
  color: #123524;
  margin: 1rem 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: #0b160f;
  border: 1px solid #123524;
  color: white;
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
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  font-size: 1.6rem;
  color: white;
  background-color: #0b160f;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledSuggestionItem = styled.li`
  padding: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #142b1d;
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
  const { token } = useAuthContext();

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
            `http://localhost:3000/artists`,
            {
              headers: {
                Authorization: `Bearer ${token?.token || ""}`,
              },
            }
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
          console.error(
            "Error fetching suggestions:",
            error.response || error.message || error
          );
          setError(
            "An error occurred while fetching suggestions. Please try again."
          );
          toast.error("Failed to fetch suggestions. Please try again.");
        }

        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300),
    [token]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setQuery("");
    setSuggestions([]);
  };

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

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
