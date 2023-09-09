import { FC, useEffect, useState } from "react";
import "./styles.css";
import { fetchMovies, Movie } from "./services/StarWarsService";
import MovieItem, { MovieItemProps } from "./components/atoms/MovieItem";
import { MovieData } from "./components/organisms/MovieCatalogue";

import Header from "./components/atoms/Header";
import MovieCatalogue from "./components/organisms/MovieCatalogue";
// import data from "./static/movie-data.json";

const App: FC<{}> = () => {

  const [movieItemList, setMovieItemList] = useState<MovieData[]>([]);

  useEffect(() => {
    // Fetch Star Wars movies data from the service
    fetchMovies()
      .then((data: Movie[]) => {
        // Map the data to the MovieItemProps format
        const mappedData = data.map((movie) => ({
          id: movie.episode_id.toString(),
          title: movie.title,
          release_date: movie.release_date,
          poster: "",
          director: movie.director,
          isFavorite: false,
        }));
        setMovieItemList(mappedData);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  console.log(movieItemList);

  return (
    <div className="App">
      <Header />
      <MovieCatalogue movieListData={movieItemList} />
    </div>
  );
};

export default App;
