import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

import { getData } from "@/core/request";
import LoadingCompoment from "../loading/Loading2";
import PaginationCompoment from "@/helpers/compoments/PaginationCompoment";
import type { ActorItem } from "@/helpers/models";
import ActorItemCompoment from "./ActorItem";

const ActorCompoment = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<number>(1);

  const { isPending, data } = useQuery({
    queryKey: [`ACTOR_ITEM_${page}_${slug || ""}`],
    queryFn: () => getData(`actors/?page=${page}&search=${slug || ""}`),
  });

  if (isPending) return <LoadingCompoment />;
  // console.log("data", data);
  return (
    <div className="my-10">
      <div className="grid grid-cols-8 gap-3">
        {data.results.map((item: ActorItem) => (
          <Link to={`/dien-vien/${item.slug}`} key={item.id}>
            <ActorItemCompoment name={item.name} image={item.image} />
          </Link>
        ))}
      </div>
      {!isPending && (
        <PaginationCompoment
          currentPage={page}
          setPage={setPage}
          totalPage={data?.total_pages ? Number(data?.total_pages) : 1}
        />
      )}
    </div>
  );
};
export default ActorCompoment;
