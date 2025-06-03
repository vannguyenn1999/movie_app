/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";

import { useListProvider } from "@/stores/ListProvider";
import { findNameBySlug } from "@/helpers/functions";
import MovieCompoment from "./MovieCompoment";

const MoviePage = () => {
  const { type, slug } = useParams();

  const { dataTopic, dataCategory, dataCountry } = useListProvider();

  const renderTitle = useMemo(() => {
    switch (type) {
      case "chu-de":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataTopic, String(slug))}{" "}
          </h1>
        );
      case "the-loai":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataCategory, String(slug))}{" "}
          </h1>
        );
      case "quoc-gia":
        return (
          <h1 className="text-white text-2xl font-bold">
            {" "}
            Phim {findNameBySlug(dataCountry, String(slug))}{" "}
          </h1>
        );

      default:
        return <h1 className="text-white text-2xl font-bold"> Phim {slug}</h1>;
    }
  }, [type, slug]);

  if (!type || !["chu-de", "the-loai", "quoc-gia"].includes(type)) {
    return <Navigate to="/home" />;
  }

  // console.log("data", data);

  return (
    <div className="px-20 py-32 min-h-[700px]">
      <>{renderTitle}</>

      <MovieCompoment />
    </div>
  );
};

export default MoviePage;
