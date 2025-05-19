import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { MovieItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";

const MovieDetailPage = () => {
  const { slug } = useParams();
  const { isPending, data } = useQuery<MovieItem>({
    queryKey: [`MOVIE_ITEM_DETAIL_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });

  if (isPending) return <LoadingCompoment />;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1f2029]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </div>
  );
};

export default MovieDetailPage;
