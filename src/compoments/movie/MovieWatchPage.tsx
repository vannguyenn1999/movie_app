import { useParams , Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { MovieItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import MovidCardItemCompoment from "./item/MovieCardItem";

const MovieWatchPage = () => {
  const { slug } = useParams();
  const { isPending, data } = useQuery<MovieItem>({
    queryKey: [`MOVIE_ITEM_WATCH_${slug}`],
    queryFn: () => getData(`movies/?search=${slug}`),
  });

  if (isPending) return <LoadingCompoment />;

  console.log("data", data);

  return (
    <>
    <div className="bg-[#1f2029] container mx-auto">
            {/* <div className="px-20 py-36 min-h-[1000px]">

                <iframe
                    src={DATA_TEST.video}
                    className="rounded-lg w-full h-100%"
                    // frameBorder="0"
                    allowFullScreen
                />

            </div> */}

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
