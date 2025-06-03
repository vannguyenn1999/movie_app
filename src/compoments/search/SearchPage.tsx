import { useParams } from "react-router-dom";
import { HiDocumentSearch } from "react-icons/hi";
import { useState } from "react";
import ActorCompoment from "../actor/ActorCompoment";
import MovieCompoment from "../movie/MovieCompoment";

const SearchPage = () => {
  const { slug } = useParams();
  const [type, setType] = useState("movie");

  return (
    <div className="px-20 py-32 min-h-[700px]">
      <div className="text-white text-2xl flex items-center">
        <HiDocumentSearch />
        <h1 className="ms-1">Kết quả tìm kiếm : "{slug}"</h1>
      </div>

      <div className="flex jsutify-start items-center mt-5">
        <button
          className={`rounded-2xl ${
            type === "movie"
              ? "text-gray-900 bg-gray-50"
              : "text-white bg-gray-600"
          } px-10 py-2 me-4 cursor-pointer`}
          onClick={() => setType("movie")}
        >
          <span className="text-sm">Phim</span>
        </button>

        <button
          className={`rounded-2xl ${
            type === "actor"
              ? "text-gray-900 bg-gray-50"
              : "text-white bg-gray-600"
          } px-10 py-2 cursor-pointer`}
          onClick={() => setType("actor")}
        >
          <span className="text-sm">Diễn Viên</span>
        </button>
      </div>

      <>
        {type === "movie" && <MovieCompoment />}
        {type === "actor" && <ActorCompoment />}
      </>
    </div>
  );
};

export default SearchPage;
