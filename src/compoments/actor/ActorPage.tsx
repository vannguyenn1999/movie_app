import { useQuery } from "@tanstack/react-query";

import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import { Link } from "react-router-dom";

const ActorPage = () => {
  const { isPending, data } = useQuery({
    queryKey: [`ACTOR_ITEM`],
    queryFn: () => getData(`actors/`),
  });

  if (isPending) return <LoadingCompoment />;
  console.log("data", data);

  return (
    <div className="px-20 py-36 min-h-[700px]">
      <h2 className="pb-4 font-bold text-2xl text-white">Các diễn viên</h2>
      <div className="grid grid-cols-8 gap-3">
        {data.results.map((item: ActorItem) => (
          <Link to={`/dien-vien/${item.slug}`} key={item.id}>
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-90 h-70 object-cover rounded-lg cursor-pointer bg-gray-600"
              />
              <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent"></div>
              <div className="absolute bottom-0 w-full flex justify-center">
                <span className="text-white text-center"> {item.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActorPage;
