import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import type { TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";

const TopicPage = () => {

    const divRefs = useRef<HTMLDivElement[]>([]);
    const { dataTopic } = useListProvider();

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
        <>
      <div className="grid grid-cols-7 gap-5 px-16 py-36">
        {
          Array.isArray(dataTopic) && dataTopic.map((item : TopicItem , index : number) => ( 
            <div ref={(el) => {
                  if (el) divRefs.current[index] = el;
                }} key={item.id} className='p-5 rounded-lg cursor-pointer'
            style={{ backgroundColor: getRandomLightHexColor()}}>
            
              <span className="text-white font-bold">
                {
                  item.title
                }
              </span>
            </div>
          ))
        }

      </div>

    <>
    )
}

export default TopicPage