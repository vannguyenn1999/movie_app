import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const LoadingLayout = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      scale: 0.7, // thu nhỏ còn 50%
      duration: 6, // 2 giây
      ease: "power2.out", // easing mượt
    });
  }, []);

  return (
    <div className="bg-[#1f2029] w-full">
      <div className="flex justify-center items-center h-screen" ref={boxRef}>
        <div className="grid grid-rows-2">
          <div className="flex justify-center items-center">
            <img
              src="https://images.seeklogo.com/logo-png/22/2/garuda-pancasila-logo-png_seeklogo-229617.png"
              alt=""
              srcSet=""
            />
          </div>
          <span className="text-white font-bold text-4xl">
            Xem phim miễn phí cực nhanh , chất lượng cao và liên tục cập nhật
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingLayout;
