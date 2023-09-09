// src/services/starWarsService.ts
export interface Movie {
    director: string;
    release_date: string;
    episode_id: number;
    title: string;
    opening_crawl: string;
  }
  
  export async function fetchMovies(): Promise<Movie[]> {
    const response = await fetch('https://swapi.dev/api/films/');
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const data = await response.json();
    return data.results;
  }
  