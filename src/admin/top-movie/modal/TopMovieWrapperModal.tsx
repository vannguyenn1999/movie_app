import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { useQuery } from "@tanstack/react-query";
import TopMovieEditModalForm from "./TopMovieEditModalForm";

const TopMovieWrapperModal = () => {
  const { itemIdTopMovieForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdTopMovieForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`TOPMOVIE_MODAL_${itemIdTopMovieForUpdate}`],
    queryFn: () => getData(`top-movies/${itemIdTopMovieForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdTopMovieForUpdate) {
    return <TopMovieEditModalForm movie={{ id: 0 }} />;
  }

  if (!isPending && data) {
    return <TopMovieEditModalForm movie={data} />;
  }

  return null;
};

export default TopMovieWrapperModal;
