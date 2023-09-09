import { CSSProperties, FC, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import MovieList from "../molecules/MovieList";
import MoviePreview from "../molecules/MoviePreview";

const movieCatalogueWrapperStyle: CSSProperties = {
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row", // Default horizontal layout for desktop
  justifyContent: "space-evenly",
  width: "100%",
};

const movieSectionWrapperStyle: CSSProperties = {
  flex: "1 1 50%",
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
};

const moviePreviewWrapperStyle: CSSProperties = {
  ...movieSectionWrapperStyle,
  textAlign: "left",
  marginRight: "1em",
  alignSelf: "flex-start",
};

const movieListWrapperStyle: CSSProperties = {
  ...movieSectionWrapperStyle,
  textAlign: "left",
  alignSelf: "center",
  width: "100%", // Full width by default
  maxWidth: "20%",
};

// Media query for screens with a maximum width of 767px (adjust as needed)
const mobileStyles: CSSProperties = {
  flexDirection: "column", // Vertical layout for mobile
};

export type MovieData = {
  id: string;
  title: string;
  release_date: string;
  poster: string;
  director: string;
  opening_crawl: string;
};


type MovieCatalogueProps = {
  movieListData: MovieData[];
};

const MovieCatalogue: FC<MovieCatalogueProps> = ({ movieListData }) => {
  
  const defaultMovieId = '4';

   // Initialize the state at the top level with a conditional value
   const initialSelectedMovieId = movieListData.length > 0 ? movieListData[0].id : defaultMovieId;

   // Use the useState hook to manage the selectedMovieId state
   const [selectedMovieId, setSelectedMovieId] = useState<string>(
     initialSelectedMovieId
   );

   // Initialize the favorites state using localStorage
  const initialFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
  const [favorites, setFavorites] = useState(initialFavorites);

  // Function to toggle the favorite status of a movie
  const toggleFavorite = (movieId: string) => {
    // Update the favorites state
    const updatedFavorites = { ...favorites };
    updatedFavorites[movieId] = !updatedFavorites[movieId];
    setFavorites(updatedFavorites);

    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
 
   // Check if movieListData is empty or undefined
   if (!movieListData || movieListData.length === 0) {
    return (
      <div className="loader-container">
        <div className="loader">
          <TailSpin color="#0073e6" height={200} width={200} />
        </div>
    </div>
    );
   }

  const selectedMovie =
    movieListData.find((movie) => movie.id === selectedMovieId) ||
    movieListData[0];

  const { title, poster, release_date, director, opening_crawl } = selectedMovie;

  return (
    <div style={{ ...movieCatalogueWrapperStyle, ...(window.innerWidth <= 767 ? mobileStyles : {}) }}>
      <div style={window.innerWidth > 767 ? movieListWrapperStyle : {}}>
        <MovieList
          movieItemList={movieListData}
          onMovieSelected={setSelectedMovieId}
          selectedMovieId={selectedMovieId}
        />
      </div>
      <div style={moviePreviewWrapperStyle}>
        <MoviePreview
          movieTitle={title}
          posterUrl={poster}
          releaseYear={release_date}
          director={director}
          description={opening_crawl}
          isFavorite={favorites[selectedMovieId]}
          onFavoriteToggle={() => toggleFavorite(selectedMovieId)}
        />
      </div>
    </div>
  );
};

export default MovieCatalogue;
