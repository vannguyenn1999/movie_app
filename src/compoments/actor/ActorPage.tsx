import { useQuery } from "@tanstack/react-query";

import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import { Link } from "react-router-dom";
import ActorItemCompoment from "./ActorItem";

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
            <ActorItemCompoment name={item.name} image={item.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActorPage;
