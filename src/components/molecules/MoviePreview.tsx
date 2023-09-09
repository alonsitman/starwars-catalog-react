import { CSSProperties, FC, useEffect, useState } from "react";
import MovieInfo from "../atoms/MovieInfo";
import MovieLabel from "../atoms/MovieLabel";
import MoviePoster from "../atoms/MoviePoster";

const moviePreviewStyle: CSSProperties = {
  padding: "0.75em",
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

const descriptionContainerStyle: CSSProperties = {
  maxHeight: "50px", // Adjust the max height as needed
  overflowY: "auto",
  padding: "10px",
};

export type MoviePreviewProps = {
  movieTitle: string;
  posterUrl: string;
  releaseYear: string;
  director: string;
  description: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

const MoviePreview: FC<MoviePreviewProps> = ({
  movieTitle,
  posterUrl,
  releaseYear,
  director,
  description,
  isFavorite,
  onFavoriteToggle,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Update the screen size state on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check for screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={moviePreviewStyle}>
      <div style={{ position: "relative" }}>
        <MoviePoster movieTitle={movieTitle} posterUrl={posterUrl} />
        <button
          onClick={onFavoriteToggle}
          style={{
            position: "absolute",
            top: isSmallScreen ? "5px" : "10px",
            right: isSmallScreen ? "5px" : "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isFavorite ? (
            <span style={{ color: "red", fontSize: "24px" }}>&#10084;</span>
          ) : (
            <span style={{ color: "gray", fontSize: "24px" }}>&#10084;</span>
          )}
        </button>
      </div>
      <MovieLabel title={movieTitle} year={releaseYear} />
      <MovieInfo label={"Director"} value={director} />
      <div style={descriptionContainerStyle}>
        <MovieInfo label={"Description"} value={description} />
      </div>
    </div>
  );
};

export default MoviePreview;
