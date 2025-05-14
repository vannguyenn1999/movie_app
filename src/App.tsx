import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import GsapCarouselLayout from "./helpers/compoments/CarouselLayout";
import InfiniteImageScroll from "./helpers/compoments/InfiniteImageScroll";

const App = () => {
  const imgRefs = useRef<HTMLImageElement[]>([]); // Tạo mảng ref để quản lý nhiều hình ảnh

  useEffect(() => {
    imgRefs.current.forEach((img) => {
      if (img) {
        // Thêm sự kiện hover
        img.addEventListener("mouseenter", () => {
          gsap.to(img, { y: -10, skew: 20, duration: 0.3 }); // Phóng to khi hover
          // gsap.to(img, { rotation: 5, duration: 0.3 }); // Xoay nhẹ khi hover
          gsap.to(img, {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            duration: 0.3,
          }); // Thêm bóng đổ khi hover
        });

        // Thêm sự kiện mouseleave
        img.addEventListener("mouseleave", () => {
          gsap.to(img, { y: 0, scale: 1, duration: 0.3 }); // Trở lại kích thước ban đầu
          gsap.to(img, {
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: 0.3,
          });
        });
      }
    });

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      imgRefs.current.forEach((img) => {
        if (img) {
          img.removeEventListener("mouseenter", () => { });
          img.removeEventListener("mouseleave", () => { });
        }
      });
    };
  }, []);

  return (
    <>
      <GsapCarouselLayout />
      <div className="h-screen bg-gray-100 grid grid-cols-4 gap-4 mx-10 mt-20 p-5 cursor-pointer">
        <img
          ref={(el) => {
            if (el) imgRefs.current[0] = el;
          }} // Gắn ref cho hình ảnh đầu tiên
          src="https://static.nutscdn.com/vimg/400-0/055875f8424f76d54b2a36feaa6edc07.jpg"
          alt="Random"
          className="rounded-xl shadow-xl"
        />
        <img
          ref={(els_1) => {
            if (els_1) imgRefs.current[1] = els_1;
          }} // Gắn ref cho hình ảnh thứ hai
          src="https://static.nutscdn.com/vimg/400-0/055875f8424f76d54b2a36feaa6edc07.jpg"
          alt="Random"
          className="rounded-xl shadow-xl"
        />
        <img
          ref={(els_2) => {
            if (els_2) imgRefs.current[2] = els_2;
          }} // Gắn ref cho hình ảnh thứ hai
          src="https://static.nutscdn.com/vimg/400-0/055875f8424f76d54b2a36feaa6edc07.jpg"
          alt="Random"
          className="rounded-xl shadow-xl"
        />
        <img
          ref={(els_3) => {
            if (els_3) imgRefs.current[3] = els_3;
          }} // Gắn ref cho hình ảnh thứ hai
          src="https://static.nutscdn.com/vimg/400-0/055875f8424f76d54b2a36feaa6edc07.jpg"
          alt="Random"
          className="rounded-xl shadow-xl"
        />
        {/* <div className="min-h-screen flex items-center justify-center bg-gray-100"> */}

        {/* </div> */}
      </div>
      <InfiniteImageScroll />

    </>
  );
};

export default App;
