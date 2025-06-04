import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";

import LoadingCompoment from "../loading/Loading2";
import { getData } from "@/core/request";
import { Link } from "react-router-dom";

const InfiniteIMovieScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const { isPending, data } = useQuery({
    queryKey: [`DATA_NEW_MOVIE`],
    queryFn: () => getData(`/movies/get-new-movies/`),
  });

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const loop = gsap.to(container, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      tweenRef.current = loop.play(); // Ban đầu không chạy
    },
    { scope: containerRef }
  );

  const handleHover = (hovering: boolean) => {
    if (!hovering) {
      tweenRef.current?.play();
    } else {
      tweenRef.current?.pause();
    }
  };

  console.log("data", data);

  return (
    <div
      className="relative w-full overflow-hidden bg-black py-6"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="flex gap-4 w-max" ref={containerRef}>
        {!isPending && Array.isArray(data) ? (
          <>
            {[...data, ...data].map(
              (item: {
                id: number;
                title: string;
                image: string;
                slug: string;
              }) => (
                <Link key={item.id} to={`/phim/${item.slug}`}>
                  <img
                    src={item.image}
                    className="w-[300px] h-[200px] object-cover rounded-md shrink-0"
                    alt={`scroll-img-${item.id}`}
                  />
                  <span className="text-amber-200 text-sm my-3 flex justify-center">
                    {item.title}
                  </span>
                </Link>
              )
            )}
          </>
        ) : (
          <>
            <LoadingCompoment />
          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteIMovieScroll;
