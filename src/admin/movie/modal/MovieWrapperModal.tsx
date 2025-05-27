import { useQuery } from "@tanstack/react-query";

import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import MovieEditModalForm from "./MovieEditModalForm";

const MovieWrapperModal = () => {
  const { itemIdMovieForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdMovieForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_MODAL_${itemIdMovieForUpdate}`],
    queryFn: () => getData(`movies/${itemIdMovieForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdMovieForUpdate) {
    return <MovieEditModalForm movie={{ id: 0 }} />;
  }

  if (!isPending && data) {
    return <MovieEditModalForm movie={data} />;
  }

  return null;
};

export default MovieWrapperModal;
