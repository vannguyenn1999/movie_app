import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import type { TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";

const bgColors = [
  "bg-amber-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-red-300",
  "bg-yellow-300",
  "bg-indigo-300",
  "bg-indigo-300",
];

const TopicLayout = () => {
  const { dataTopic } = useListProvider();
  const divRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    divRefs.current.forEach((img) => {
      if (img) {
        // Thêm sự kiện hover
        img.addEventListener("mouseenter", () => {
          gsap.to(img, { y: -10, duration: 0.3 }); // Phóng to khi hover
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
      divRefs.current.forEach((img) => {
        if (img) {
          img.removeEventListener("mouseenter", () => {});
          img.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <div className="mx-16">
      <div className="grid grid-cols-6 gap-2">
        {(Array.isArray(dataTopic) ? dataTopic.slice(0, 5) : []).map(
          (item: TopicItem, index: number) => {
            return (
              <Link to={`/chu-de/${item.slug}`} key={item.id}>
                <div
                  ref={(el) => {
                    if (el) divRefs.current[index] = el;
                  }}
                  className={`p-10 ${bgColors[index]} cursor-pointer rounded-xl `}
                >
                  <span className="flex justify-center items-center align-middle font-bold text-white text-xl">
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          }
        )}
        <Link to="/chu-de">
          <div
            ref={(el) => {
              if (el)
                divRefs.current[
                  Array.isArray(dataTopic) ? dataTopic.length - 5 : 10
                ] = el;
            }}
            className="p-10 bg-cyan-800 cursor-pointer rounded-xl"
          >
            <span className="flex justify-center items-center align-middle font-bold text-white text-xl">
              + {Array.isArray(dataTopic) ? `${dataTopic.length - 5}` : "10"}{" "}
              Chủ đề
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopicLayout;
