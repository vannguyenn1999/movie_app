import { getData } from "@/core/request";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { MovieItem } from "@/helpers/models";

const HeaderLayout = () => {
  const [current, setCurrent] = useState<number>(0); // Ảnh nền hiện tại
  const backgroundRef = useRef<HTMLDivElement>(null); // Tham chiếu đến ảnh nền
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_HEADERS`],
    queryFn: () => getData(`/movies/get-movies-header`),
  });

  const changeBackground = (index: number) => {
    if (index === current) return; // Nếu ảnh được chọn là ảnh hiện tại, không làm gì
    console.log("data[current]", data[index]);
    setCurrent(index);
    // Animation làm mờ ảnh hiện tại
    // gsap.to(backgroundRef.current, {
    //   opacity: 0,
    //   duration: 0.5,
    //   onComplete: () => {
    //     setCurrent(index); // Cập nhật ảnh nền
    //     // Animation hiển thị ảnh mới
    //     gsap.to(backgroundRef.current, { opacity: 1, duration: 0.5 });
    //   },
    // });
  };

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.from(backgroundRef.current, { opacity: 2, x: 10, duration: 1 });
    }
  }, [current]);

  if (isPending) return <>Loding</>;

  console.log("data", data);

  return (
    <div className="relative w-full h-screen bg-gray-100 ">
      {/* Ảnh nền */}
      <div
        ref={backgroundRef}
        className={`absolute top-0 left-0 w-full h-full bg-cover transition-opacity duration-1000 mask-radial-[100%_100%] mask-radial-from-95% mask-radial-at-top`}
        style={{
          backgroundImage: `url(${data[current].image})`,
          //   backgroundSize: "contain", // Đảm bảo ảnh hiển thị đầy đủ mà không bị cắt
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          //   backgroundPosition: "center", // Căn giữa ảnh
        }}
      ></div>

      {/* Danh sách ảnh nhỏ */}
      {/* <div className="relative z-10"> */}
      <div className="absolute bottom-10 right-40 flex justify-end items-end space-x-4">
        {data.map((item: MovieItem, index: number) => (
          <img
            key={item.id}
            src={item.image_avatar ? item.image_avatar : ""}
            alt={`Thumbnail ${item.id}`}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
              index === current
                ? "ring-4 ring-blue-500"
                : "ring-2 ring-gray-300"
            }`}
            onClick={() => changeBackground(index)} // Thay đổi ảnh nền khi click
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderLayout;
