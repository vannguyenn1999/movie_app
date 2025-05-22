import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getData } from "@/core/request";
import type { MovieItem } from "@/helpers/models";
import LoadingCompoment from "@/compoments/loading/Loading2";
import { useListProvider } from "@/stores/ListProvider";
import { findNameBySlug } from "@/helpers/functions";
import MovieItemCompoment from "@/compoments/movie/item/MovieItem";

const MoviePage = () => {
  const { type, slug } = useParams();
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ITEM_DETAIL_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });

  const { dataTopic, dataCategory, dataCountry } = useListProvider();

  const renderTitle = useMemo(() => {
    switch (type) {
      case "chu-de":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataTopic, String(slug))}{" "}
          </h1>
        );
      case "the-loai":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataCategory, String(slug))}{" "}
          </h1>
        );
      case "quoc-gia":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataCountry, String(slug))}{" "}
          </h1>
        );
      default:
        return <h1 className="text-white text-2xl font-bold"> Phim {slug}</h1>;
    }
  }, [type, slug]);

  if (!type || !["chu-de", "the-loai", "quoc-gia"].includes(type)) {
    return <Navigate to="/home" />;
  }

  if (isPending) return <LoadingCompoment />;

  console.log("data", data);

  return (
    <div className="px-20 py-32 min-h-[700px]">
      <>{renderTitle}</>

      <div className="my-10">
        <div className="grid grid-cols-7 gap-5">
          {data.results.map((item: MovieItem) => (
            <MovieItemCompoment
              id={item.id}
              duration={item.duration}
              image={item.image}
              image_avatar={item.image_avatar}
              imdb={item.imdb}
              release_date={item.release_date}
              title={item.title}
              slug={item.slug}
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
      </div>
    </div>
  );
};

export default MoviePage;
