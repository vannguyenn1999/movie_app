import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { lazy } from "react";

import { getData } from "@/core/request";
// import type { ActorItem } from "@/helpers/models";
import { convertTime } from "@/helpers/functions";
import type { MovieItem } from "@/helpers/models";

const LoadingCompoment = lazy(() => import("@/compoments/loading/Loading2"));

const ActorDetailPage = () => {
  const { slug } = useParams();

  const { isPending, data } = useQuery({
    queryKey: [`ACTOR_ITEM_DETAIL_${slug}`],
    queryFn: () => getData(`actors/?search=${slug}`),
  });

  const { isPending: isPendingSuggestion, data: dataSuggestion } =
    useQuery<MovieItem>({
      queryKey: [`ACTOR_SUGGESTION_${slug}`],
      queryFn: () => getData(`movies/get-suggestion-movie/?actor=${slug}`),
    });

  if (isPending || isPendingSuggestion) return <LoadingCompoment />;

  if (!data || data?.results.length == 0) {
    return <Navigate to="/home" />;
  }

  console.log("dataSuggestion", dataSuggestion);

  return (
    <div className="px-20 py-20 min-h-[700px]">
      <div className="grid grid-cols-4">
        <div className="border-r-1 border-gray-500 p-5">
          <div>
            <img
              src={data?.results[0]?.image}
              alt={`${data?.results[0]?.name}`}
              srcSet=""
              className="object-cover rounded-2xl w-50 h-50 bg-gray-600"
              loading="lazy"
            />
          </div>
          <h3 className="py-5 font-bold text-2xl text-white">
            {data?.results[0]?.name}
          </h3>

          <div className="mb-3">
            <h4 className="text-white font-bold">Giới thiệu :</h4>
            <span className="text-sm text-white">{data?.results[0]?.info}</span>
          </div>

          <div className="mb-3">
            <h4 className="text-white font-bold">Giới tính :</h4>
            <span className="text-sm text-white">
              {data?.results[0]?.gender}
            </span>
          </div>

          <div className="mb-3">
            <h4 className="text-white font-bold">Quốc tịch :</h4>
            <span className="text-sm text-white">
              {data?.results[0]?.country}
            </span>
          </div>

          <div className="mb-3">
            <h4 className="text-white font-bold">Ngày sinh :</h4>
            <span className="text-sm text-white">
              {convertTime(data?.results[0]?.birthday)}
            </span>
          </div>
        </div>
        <div className="col-span-3 p-5">
          <div>
            <h2 className="text-white font-bold text-xl">
              {" "}
              Các bộ phim đã tham gia
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-4 pt-5">
            {Array.isArray(dataSuggestion) &&
              dataSuggestion.map((item: MovieItem) => {
                return (
                  <Link to={`/xem-phim/${item.slug}`} key={item.id}>
                    <img
                      src={item.image_avatar ? String(item.image_avatar) : ""}
                      alt={item.title}
                      className="rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <span className="flex justify-center text-white text-sm pt-2">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;
