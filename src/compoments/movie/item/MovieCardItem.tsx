import type { FC } from "react";

import { convertTime } from "@/helpers/functions";

type MovidCardItemProps = {
  image: string;
  title: string;
  release_date: string;
  duration: string;
};

const MovidCardItemCompoment: FC<MovidCardItemProps> = ({
  image,
  title,
  release_date,
  duration,
}) => {
  return (
    <div className="flex p-3 bg-gray-700 w-auto rounded-xl me-5">
      <img
        src={image}
        alt=""
        srcSet=""
        className="object-cover w-24 h-24 rounded-2xl"
        loading="lazy"
      />
      <div className="ms-3 my-auto">
        <h5 className="text-center text-gray-300 font-semibold">{title}</h5>
        <div className="flex items-center justify-start my-3">
          <span className="text-white text-sm mx-1">
            {convertTime(release_date)} &#9702;
          </span>

          <span className="text-white text-sm mx-1">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MovidCardItemCompoment;
