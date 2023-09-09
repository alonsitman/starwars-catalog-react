import { FC, useEffect, useState } from "react";
import "./styles.css";
import { fetchMovies, Movie } from "./services/StarWarsService";
import { MovieData } from "./components/organisms/MovieCatalogue";
import MovieCatalogue from "./components/organisms/MovieCatalogue";
import Header from "./components/atoms/Header";
// import data from "./static/movie-data.json";

const App: FC<{}> = () => {
  const [movieItemList, setMovieItemList] = useState<MovieData[]>([]);
  const tmdbApiKey = "8dc1fdb780a33a075bb5638c81710a48"; 

  const fetchMoviePoster = async (title: string, apiKey: string): Promise<any> => {
    const sw_prefix = "Star Wars ";
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          sw_prefix + title
        )}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return {};
    } catch (error) {
      console.error(`Error fetching TMDB data for ${title}: ${error}`);
      return {};
    }
  };

  useEffect(() => {
    // Fetch Star Wars movies data from the service (swapi.dev)
    fetchMovies()
      .then((data) => {
        // Map the data to the MovieItemProps format and fetch posters
        const mappedDataPromises = data.map(async (movie) => {
          const tmdbData = await fetchMoviePoster(movie.title, tmdbApiKey);
          return {
            id: movie.episode_id.toString(),
            title: movie.title,
            release_date: movie.release_date.split('-')[0],
            poster: tmdbData.poster_path
              ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
              : "", // Use the poster URL from TMDB if available
            director: movie.director,
            opening_crawl: movie.opening_crawl

          };
        });

        Promise.all(mappedDataPromises)
          .then((mappedData) => {
            setMovieItemList(mappedData);
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);



  return (
    <div className="App">
      <Header />
      <MovieCatalogue movieListData={movieItemList} />
    </div>
  );
};

export default App;
