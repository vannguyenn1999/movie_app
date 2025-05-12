import { useRef, useState } from "react";
import { gsap } from "gsap";

// const images = [
//   "https://static.nutscdn.com/vimg/150-0/9ba596b8967e83efb593dede1641ad39.jpg",
//   "https://static.nutscdn.com/vimg/150-0/34d52a3d2fff34e05addeb6a92014d28.jpg",
//   "https://static.nutscdn.com/vimg/150-0/af35d59eb4f1a742c256e1e735e3b3c0.jpg",
//   "https://static.nutscdn.com/vimg/150-0/9a44d00b6825dc9c8795880754f9cbd9.jpg",
//   "https://static.nutscdn.com/vimg/150-0/d5f1f49673eb32f217afc9d77890db59.jpg",
//   "https://static.nutscdn.com/vimg/150-0/d8f1215b7f715d255c94cd16c7dcfa95.jpg",
// ];

const images = [
  {
    id: 1,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/d5f1f49673eb32f217afc9d77890db59.jpg",
  },
  {
    id: 2,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/9ba596b8967e83efb593dede1641ad39.jpg",
  },
  {
    id: 3,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/af35d59eb4f1a742c256e1e735e3b3c0.jpg",
  },
  {
    id: 4,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/9a44d00b6825dc9c8795880754f9cbd9.jpg",
  },
  {
    id: 5,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/d5f1f49673eb32f217afc9d77890db59.jpg",
  },
  {
    id: 6,
    thum: "https://static.nutscdn.com/vimg/1920-0/d5f1f49673eb32f217afc9d77890db59.jpg",
    ava: "https://static.nutscdn.com/vimg/150-0/d8f1215b7f715d255c94cd16c7dcfa95.jpg",
  },
];

const GsapCarouselLayout: React.FC = () => {
  const [current, setCurrent] = useState<number>(0); // Ảnh nền hiện tại
  const backgroundRef = useRef<HTMLDivElement>(null); // Tham chiếu đến ảnh nền

  const changeBackground = (index: number) => {
    if (index === current) return; // Nếu ảnh được chọn là ảnh hiện tại, không làm gì

    // Animation làm mờ ảnh hiện tại
    gsap.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrent(index); // Cập nhật ảnh nền
        // Animation hiển thị ảnh mới
        gsap.to(backgroundRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 ">
      {/* Ảnh nền */}
      <div
        ref={backgroundRef}
        className={`absolute top-0 left-0 w-full h-full bg-cover transition-opacity duration-1000 mask-radial-[100%_100%] mask-radial-from-95% mask-radial-at-top`}
        style={{
          backgroundImage: `url(${images[current].thum})`,
          //   backgroundSize: "contain", // Đảm bảo ảnh hiển thị đầy đủ mà không bị cắt
          backgroundRepeat: "no-repeat", // Không lặp lại ảnh
          //   backgroundPosition: "center", // Căn giữa ảnh
        }}
      ></div>

      {/* Danh sách ảnh nhỏ */}
      {/* <div className="relative z-10"> */}
      <div className="absolute bottom-10 right-40 flex justify-end items-end space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.ava}
            alt={`Thumbnail ${index}`}
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
    // </div>
  );
};

export default GsapCarouselLayout;
