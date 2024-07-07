import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 60rem;
  height: 35rem;
  border: none;
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
`;

const YouTubePlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background-color: #0b160f;
  border-radius: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 4rem;

  transition: box-shadow 0.3s;
  &:focus {
    box-shadow: 0 0 0 4px rgba(38, 77, 41, 0.7);
  }
`;

const YouTubePlayer = ({ trackTitle, artistName }) => {
  const [videoId, setVideoId] = useState(null);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: `${trackTitle} - ${artistName} official audio`,
              type: "video",
              key: import.meta.env.VITE_YOUTUBE_API_KEY,
            },
          }
        );
        if (response.data.items.length > 0) {
          setVideoId(response.data.items[0].id.videoId);
        }
      } catch (error) {
        console.error("Error fetching YouTube video:", error);
        toast.error("Failed to fetch YouTube video. Please try again.");
      }
    };

    if (trackTitle) {
      fetchVideoId();
    }
  }, [trackTitle]);

  useEffect(() => {
    if (playerContainerRef.current) {
      playerContainerRef.current.focus();
    }
  }, [videoId]);

  if (!videoId) return null;

  return (
    <YouTubePlayerContainer ref={playerContainerRef} tabIndex={0}>
      <StyledIframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube video player"
      ></StyledIframe>
    </YouTubePlayerContainer>
  );
};

export default YouTubePlayer;
