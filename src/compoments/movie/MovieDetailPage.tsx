import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RatingStar, Rating } from "flowbite-react";
import { FaPlay, FaHeart, FaShare, FaCommentDots } from "react-icons/fa";

import type { ActorItem, CategoryItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import TagLayout from "./tags/Tags";
import { useCallback } from "react";

const MovieDetailPage = () => {
  const { slug } = useParams();
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ITEM_DETAIL_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });

  const convertString = useCallback((data: CategoryItem[]) => {
    let words = "";
    data.map((item: CategoryItem) => (words += item.slug + ","));
    return words;
  }, []);

  if (isPending) return <LoadingCompoment />;

  if (!data?.results[0]) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-white text-2xl font-bold">Không tìm thấy phim</h1>
      </div>
    );
  }
  console.log("da", data);

  return (
    <div className="px-20 py-32 min-h-[700px]">
      <div className="grid grid-cols-4">
        <div className="pe-4">
          <img
            src={data?.results[0]?.image}
            alt={data?.results[0]?.title}
            className="object-contain w-60 rounded-xl bg-gray-400"
          />
          <div className="my-3">
            <span className="text-white font-bold text-xl">
              {data?.results[0]?.title}
            </span>
          </div>

          <div className="flex items-center mt-10">
            <div className="outline outline-amber-300 px-5 py-0.5 text-white rounded-xl">
              <span className="text-sm me-1 text-amber-300">IMDb</span>
              {data?.results[0]?.imdb}
            </div>

            <div className="mx-5 outline outline-gray-100 px-2 py-0.5 text-white rounded-lg bg-gray-700">
              {data?.results[0]?.release_date}
            </div>

            <div className="outline outline-gray-100 px-2 py-0.5 text-white rounded-lg bg-gray-700">
              {data?.results[0]?.duration}
            </div>
          </div>

          <div className="flex items-center justify-start my-3">
            {data?.results[0]?.category.map((category: CategoryItem) => (
              <span
                key={category.id}
                className="text-white text-[10px] xl:text-[12px] bg-gray-700 rounded-full px-2 py-1 me-2"
              >
                {category.name}
              </span>
            ))}
          </div>

          <div>
            <span className="text-white">Giới Thiệu :</span>
            <p className="text-gray-400 text-sm mt-1.5">
              {data?.results[0]?.description}
            </p>
          </div>

          <p className="text-white mt-3">
            Thời lượng :{" "}
            <span className="text-gray-400 text-sm ms-2">
              {data?.results[0]?.duration}
            </span>
          </p>
          <p className="text-white mt-3">
            Quốc gia :{" "}
            <span className="text-gray-400 text-sm ms-2">
              {data?.results[0]?.country?.name || "Đang cập nhật"}
            </span>
          </p>

          <h2 className="text-white font-bold mt-10 text-xl">Diễn viên</h2>
          <div className="px-5 grid grid-cols-3 gap-4 pt-5">
            {data?.results[0]?.actor.map((item: ActorItem) => (
              <Link to={`/dien-vien/${item.slug}`} key={item.id}>
                <div className="flex justify-center items-centers">
                  <img
                    className="w-20 h-20 rounded-full object-cover "
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <span className="flex justify-center items-centers mt-2 text-white text-sm text-center">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to={`/xem-phim/${slug}`}>
                <button className="py-3 px-6 rounded-xl bg-amber-300 cursor-pointer hover:shadow-xl/30 hover:shadow-amber-500/50 hover:bg-amber-400 transition-all duration-300 flex items-center justify-center">
                  <FaPlay />
                  <span className="ms-2 text-gray-800 font-semibold">
                    Xem ngay
                  </span>
                </button>
              </Link>

              <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer ms-20">
                <div className="flex items-center justify-center pb-1">
                  <FaHeart />
                </div>
                <span className="text-sm font-semibold"> Yêu thích </span>
              </div>

              <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer ms-5">
                <div className="flex items-center justify-center pb-1">
                  <FaCommentDots />
                </div>
                <span className="text-sm font-semibold"> Bình luận </span>
              </div>

              <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer ms-5">
                <div className="flex items-center justify-center pb-1">
                  <FaShare />
                </div>
                <span className="text-sm font-semibold"> Chia sẻ </span>
              </div>
            </div>
            <div>
              <Rating>
                '
                <div className="flex items-center justify-center py-3 px-6 bg-blue-400 rounded-xl">
                  <span className=" text-white me-2">
                    {" "}
                    {data?.results[0]?.rating}{" "}
                  </span>
                  <RatingStar />
                </div>
              </Rating>
            </div>
          </div>

          <>
            <TagLayout
              dataActor={data?.results[0]?.actor}
              slug={convertString(data?.results[0]?.category)}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
