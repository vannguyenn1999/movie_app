import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { MovieItem } from "@/helpers/models";
import MovieItemCompoment from "./item/MovieItem";
import { getData } from "@/core/request";
import LoadingCompoment from "../loading/Loading2";
import PaginationCompoment from "@/helpers/compoments/PaginationCompoment";
import { useState } from "react";

const MovieCompoment = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<number>(1);

  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ITEM_DETAIL_${page}_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}&page=${page}`),
  });

  if (isPending) return <LoadingCompoment />;

  return (
    <div className="my-10">
      <div className="grid grid-cols-7 gap-5">
        {Array.isArray(data.results) &&
          data.results.length > 0 &&
          data.results.map((item: MovieItem) => (
            <MovieItemCompoment
              id={item.id}
              duration={item.duration || ""}
              image={String(item.image)}
              image_avatar={String(item.image_avatar)}
              imdb={item.imdb || 5}
              release_date={String(item.release_date)}
              title={item.title || ""}
              slug={item.slug || " "}
              category={
                Array.isArray(item?.category)
                  ? item.category
                  : item?.category
                  ? [item.category]
                  : []
              }
            />
          ))}
      </div>
      {!isPending && (
        <PaginationCompoment
          currentPage={page}
          setPage={setPage}
          totalPage={data?.total_pages ? Number(data?.total_pages) : 1}
        />
      )}
    </div>
  );
};
export default MovieCompoment;
