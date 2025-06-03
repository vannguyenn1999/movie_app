import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import type { MovieItem, CategoryItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import TopicLayout from "@/compoments/home/Topic";
import HomeMovie from "./HomeMovie";

const HomePage = () => {
  const [current, setCurrent] = useState<number>(0); // Ảnh nền hiện tại
  const backgroundRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { dataHeader } = useListProvider();
  const data: MovieItem[] = dataHeader as MovieItem[];

  const changeBackground = (index: number) => {
    if (index === current) return; // Nếu ảnh được chọn là ảnh hiện tại, không làm gì
    gsap.to(backgroundRef.current, {
      x: "-100%",
      duration: 0.3,
      ease: "power3.out",
    });

    gsap.from(infoRef.current, {
      x: -300,
      duration: 1,
    });

    setCurrent(index);
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Ảnh nền */}
        <div
          className={`absolute inset-0 bg-cover mask-radial-[100%_100%] mask-radial-from-95% mask-radial-at-top`}
          style={{
            backgroundImage: `url(${data[current]?.image})`,
            // backgroundSize: "contain", // Đảm bảo ảnh hiển thị đầy đủ mà không bị cắt
            backgroundRepeat: "no-repeat", // Không lặp lại ảnh
            //   backgroundPosition: "center", // Căn giữa ảnh
          }}
        >
          <div
            ref={backgroundRef}
            className="absolute inset-0 bg-transparent z-50"
          ></div>
        </div>

        {/* <div className="fixed w-full px-16">
        <NavBarLayout />
      </div> */}

        {/* Danh sách ảnh nhỏ */}
        {/* <div className="relative z-10"> */}
        <div className="absolute bottom-10 right-40 flex justify-end items-end space-x-4">
          {data.map((item: MovieItem, index: number) => (
            <img
              key={item.id}
              src={String(item.image_avatar)}
              alt={`Thumbnail ${item.id}`}
              className={`w-24 h-15 object-cover rounded-lg cursor-pointer ${
                index === current
                  ? "ring-4 ring-blue-500"
                  : "ring-2 ring-gray-300"
              }`}
              onClick={() => changeBackground(index)} // Thay đổi ảnh nền khi click
            />
          ))}
        </div>

        <div className="absolute top-52 left-16" ref={infoRef}>
          <h4 className="text-wrap text-yellow-300">{data[current].title}</h4>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="border-2 border-amber-50 py-1 rounded-lg">
              <span className="text-amber-50 flex justify-center items-center text-sm">
                imdb : {data[current].imdb}
              </span>
            </div>
            <div className="border-2 border-amber-50 p-1 rounded-lg">
              <span className="text-amber-50 flex justify-center">
                {String(data[current].release_date)}
              </span>
            </div>
            <div className="border-2 border-amber-50 py-1 px-0 rounded-lg">
              <span className="text-amber-50 flex justify-center">
                {data[current].duration}
              </span>
            </div>
          </div>
          {/* Danh mục phim */}
          <div
            className={`grid grid-cols-6 gap-4 mt-5`}
            // className={`grid grid-cols-6 gap-4 mt-9`}
          >
            {Array.isArray(data[current]?.category) &&
              data[current]?.category.map((item: CategoryItem) => (
                <div
                  className="text-sm border-2 border-amber-50 px-1.5 rounded-lg cursor-pointer hover:border-amber-300"
                  key={item.id}
                >
                  <span className="text-amber-50 flex justify-center hover:text-amber-300">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>

          <div className="w-100 mt-5">
            <span className="text-amber-50 text-sm">
              {data[current].description?.slice(0, 300)}...
            </span>
          </div>

          <div className="mt-5">
            <Link to={`/xem-phim/${data[current].slug}`}>
              <button className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-200 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                <svg
                  className="w-10 h-10 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Chủ để ở trang chủ */}
      <>
        <TopicLayout />
      </>
      {/* Chủ để ở trang chủ */}

      {/* Phim ở trang chủ */}
      <>
        <HomeMovie />
      </>
      {/* Phim ở trang chủ */}
    </>
  );
};

export default HomePage;
