/*
 * Instead of dynamically refreshing via useData, we are now statically
 * including data with repository. This will need refreshed if the API
 * changes.
 */

import genreData from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => {
  return { data: genreData, error: [], isLoading: false };
};

export default useGenres;
