import type { FC } from "react";
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import type { CategoryItem } from "@/helpers/models";
import { Link } from "react-router-dom";

type MovieItemProps = {
  id: number;
  duration: string;
  image: string | null;
  image_avatar: string | null;
  imdb: number;
  release_date: string;
  title: string;
  slug: string;
  category?: CategoryItem[] | [];
};

const MovieItemCompoment: FC<MovieItemProps> = ({
  id,
  duration,
  image,
  image_avatar,
  imdb,
  release_date,
  title,
  slug,
  category,
}) => {
  return (
    <div
      className="cursor-pointer group relative w-auto inline-block "
      key={id}
    >
      <div className="flex justify-center items-center">
        <img
          className="block rounded-2xl object-cover w-62 h-76 bg-gray-600"
          src={image_avatar ? image_avatar : ""}
          alt=""
          srcSet=""
        />
      </div>
      <span className="flex justify-center items-center mt-2 w-auto text-center text-white font-bold text-sm">
        {title}
      </span>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 min-h-[400px] inset-0 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10  duration-500 mx-2">
        <div className="relative w-100 h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-2xl z-50 h-52"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent"></div>
          </div>
          <div className="absolute bottom-4 z-50 px-3">
            <span className="text-white">{title}</span>
            <div className="flex items-center justify-center my-2">
              <Link to={`/xem-phim/${slug}`}>
                <Button color="yellow" outline className="cursor-pointer px-6">
                  <FaPlay />
                  <span className="ms-2">Xem ngay</span>
                </Button>
              </Link>

              <Button color="red" outline className=" cursor-pointer mx-3">
                <FaHeart />
                <span className="ms-2">Thích</span>
              </Button>

              <Link to={`/phim/${slug}`}>
                <Button color="purple" outline className="cursor-pointer">
                  <FaInfoCircle />
                  <span className="ms-2">Chi tiết</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-start my-3">
              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 outline outline-amber-300  mx-1">
                {imdb}
              </span>

              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                {release_date}
              </span>

              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                {duration}
              </span>
            </div>
            <div className="flex items-center justify-start my-2">
              {Array.isArray(category) &&
                category.map((category: CategoryItem) => (
                  <span
                    key={category.id}
                    className="text-white text-sm bg-gray-700 rounded-full px-2 py-1 mx-1"
                  >
                    {category.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItemCompoment;
