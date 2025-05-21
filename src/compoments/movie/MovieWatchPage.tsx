import { useParams , Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaFlag, FaHeart, FaShare } from "react-icons/fa";


import type { MovieItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import MovidCardItemCompoment from "./item/MovieCardItem";

const MovieWatchPage = () => {
  const { slug } = useParams();
  const [cinemaMode, setCinemaMode] = useState(false);
  const { isPending, data } = useQuery<MovieItem>({
    queryKey: [`MOVIE_ITEM_WATCH_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });


  if (isPending) return <LoadingCompoment />;

  console.log("data", data);

  return (
    <>
    <div className="bg-[#1f2029] container mx-auto min-h-[1000px] relative">
           {cinemaMode && (
                <div
                    className="fixed inset-0 bg-black z-30"
                />
            )}

            {/* Video section */}
            {/* <div className={`my-10 rounded-xl ${cinemaMode ? "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-5xl" : ""}`}> */}
            <div className={`my-10 rounded-xl  relative shadow-lg z-50`}>
                <iframe
                    src={DATA_TEST.video}
                    className="w-full rounded-t-xl"
                    width="1920"
                    height="1080"
                    allowFullScreen
                />
                <div className="min-h-[50px] bg-[#08080a]">
                    <div className="flex justify-between items-center px-5 py-3 rounded-b-xl">
                        <div className="flex items-center px-5">
                            <div className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800" >
                                <FaHeart />
                                <span className="ms-2">
                                    Yêu thích
                                </span>
                            </div>
                            <div className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800" >
                                <FaShare />
                                <span className="ms-2">
                                    Chia sẻ
                                </span>
                            </div>
                            <div onClick={() => setCinemaMode(!cinemaMode)} className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800" >
                                <div className="ms-2 flex items-center ">
                                    Rạp phim
                                    <span className="text-[10px] text-amber-500 ms-2 border border-amber-500 p-0.5 rounded-xl px-2">
                                        {
                                            cinemaMode ? "ON" : "OFF"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <FaFlag className="text-white" />
                            <span className="text-white ms-2">Báo lỗi</span>
                        </div>
                    </div>
                </div>
                {/* Nút đóng khi ở cinema mode */}

            </div>

            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="">
                            <MovidCardItemCompoment
                                image={DATA_TEST.image}
                                title={DATA_TEST.title}
                                release_date={DATA_TEST.release_date}
                                duration={DATA_TEST.duration}
                            />
                        </div>

                        <div className="my-auto">
                            <p className="text-gray-400 text-sm mb-4">{DATA_TEST.description.slice(0, 300)}...</p>
                            <Link to='/home'><span className="text-amber-300">Thông tin phim</span></Link>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-white font-bold mt-10 text-xl">Diễn viên</h2>
                    <div className="px-5 grid grid-cols-3 gap-4 py-5">
                        {DATA_TEST.actor.map((item) => (
                            <Link to={`/dien-vien/${item.slug}`} key={item.id}>
                                <div className="flex justify-center items-centers">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover "
                                        src={item.img}
                                        alt={item.name}
                                    />
                                </div>
                                <span className="flex justify-center items-centers mt-2 text-white text-sm text-center">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <h2 className="text-white font-bold mb-5 text-xl">Đề xuất cho bạn</h2>
                    <div>
                        {
                            DATA_TEST2.map((item) => (
                                <Link to={`/phim/${item.slug}`} key={item.id}>
                                    <div className="mb-2">
                                        <MovidCardItemCompoment
                                            image={item.image}
                                            title={item.title}
                                            release_date={item.release_date}
                                            duration={item.duration}
                                        />
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    </>
  )
};

export default MovieWatchPage;
