import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getData } from "@/core/request";
import type { MovieItem } from "@/helpers/models";
import LoadingCompoment from "@/compoments/loading/Loading2";

const MoviePage = () => {
  const { type, slug } = useParams();
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ITEM_DETAIL_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });

  if (!type || !["chu-de", "the-loai", "quoc-gia"].includes(type)) {
    return <Navigate to="/home" />;
  }

  if (isPending) return <LoadingCompoment />;

  console.log("data", data);

  return <div className="w-full min-h-[700px]"></div>;
};

export default MoviePage;
