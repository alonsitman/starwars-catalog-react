import { CSSProperties, FC, useState } from "react";
import { TailSpin } from "react-loader-spinner";





import MovieList from "../molecules/MovieList";
import MoviePreview from "../molecules/MoviePreview";

const movieCatalogueWrapperStyle: CSSProperties = {
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  width: "100%"
};

const movieSectionWrapperStyle: CSSProperties = {
  flex: "1 1 50%",
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const moviePreviewWrapperStyle: CSSProperties = {
  ...movieSectionWrapperStyle,
  textAlign: "center",
  marginRight: "1em",
  alignSelf: "flex-start"
};

const movieListWrapperStyle: CSSProperties = {
  ...movieSectionWrapperStyle,
  textAlign: "left",
  alignSelf: "flex-end"
};

export type MovieData = {
  id: string;
  title: string;
  release_date: string;
  poster: string;
  director: string;
};


type MovieCatalogueProps = {
  movieListData: MovieData[];
};

const MovieCatalogue: FC<MovieCatalogueProps> = ({ movieListData }) => {
  
   // Initialize the state at the top level with a conditional value
   const initialSelectedMovieId = movieListData.length > 0 ? movieListData[0].id : '';

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
    <div>
      {<TailSpin radius={20} />}
    </div>
    );
   }

  const selectedMovie =
    movieListData.find((movie) => movie.id === selectedMovieId) ||
    movieListData[0];

  const { title, poster, release_date, director } = selectedMovie;
  return (
    <div style={movieCatalogueWrapperStyle}>
      <div style={moviePreviewWrapperStyle}>
        <MoviePreview
          movieTitle={title}
          posterUrl={poster}
          releaseYear={release_date}
          director={director}
          isFavorite={favorites[selectedMovieId]}
          onFavoriteToggle={() => toggleFavorite(selectedMovieId)}
        />
      </div>
      <div style={movieListWrapperStyle}>
        <MovieList
          movieItemList={movieListData}
          onMovieSelected={setSelectedMovieId}
          selectedMovieId={selectedMovieId}
        />
      </div>
    </div>
  );
};

export default MovieCatalogue;
