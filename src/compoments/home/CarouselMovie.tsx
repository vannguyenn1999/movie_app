import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import { getData } from "@/core/request";
import LoadingCompoment from "../loading/Loading2";
import type { TopMovie } from "@/helpers/models";
import { Link } from "react-router-dom";

const CarouselMovie = () => {
  const { isPending, data } = useQuery({
    queryKey: [`DATA_TOPMOVIE`],
    queryFn: () => getData(`/top-movies/`),
  });

  if (isPending) return <LoadingCompoment />;

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={5}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}

        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data.map((item: TopMovie) => (
          <SwiperSlide key={item.id}>
            <Link to={`/phim/${item.movie?.slug}`}>
              <div className="mx-auto max-w-[300px]">
                <img
                  src={String(item.movie?.image)}
                  className="w-[300px] h-[350px] object-cover rounded-md shrink-0"
                  //   alt={`scroll-img-${idx}`}
                />
                <div className="flex justify-start mb-5">
                  <span className="text-amber-300 text-6xl me-2 font-serif text-shadow-lg/30">
                    {item.level}
                  </span>
                  <div className="flex flex-col py-3">
                    <span className="text-sm text-white text-start mb-1">
                      {item.movie?.title}
                    </span>
                    <span className="text-sm text-white">
                      {item.movie?.duration}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselMovie;
