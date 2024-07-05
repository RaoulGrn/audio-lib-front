import { useState, useEffect } from "react";
import axios from "axios";

const YouTubePlayer = ({ trackTitle }) => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: `${trackTitle} official audio`,
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
      }
    };

    if (trackTitle) {
      fetchVideoId();
    }
  }, [trackTitle]);

  if (!videoId) return null;

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="YouTube video player"
    ></iframe>
  );
};

export default YouTubePlayer;
