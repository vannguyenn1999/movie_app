import { lazy } from "react";

const CarouselMovie = lazy(() => import("./CarouselMovie"));
const InfiniteIMovieScroll = lazy(() => import("./InfiniteIMovieScroll"));

const HomeMovie = () => {
  return (
    <>
      <div>
        <h1 className="text-white font-bold text-2xl mx-15 mt-10 mb-5">
          Top 10 bộ phim hôm nay
        </h1>
        <div className="mx-15">
          <CarouselMovie />
        </div>
      </div>

      <div>
        <h2 className="text-white font-bold text-2xl mx-15 mt-5 mb-5">
          Phim mới
        </h2>
        <div className="mx-15 pb-10">
          <InfiniteIMovieScroll />
        </div>
      </div>
    </>
  );
};
export default HomeMovie;
