import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getData } from "@/core/request";
import type { ActorItem } from "@/helpers/models";
import LoadingCompoment from "@/layouts/loading/Loading2";

const ActorDetailPage = () => {
    const { slug } = useParams();
    const { isPending, data } = useQuery<ActorItem>({
        queryKey: [`ACTOR_ITEM_DETAIL_${slug}`],
        queryFn: () => getData(`actors/?search=${slug}`),
    });

    if (isPending) return <LoadingCompoment />
    return (
        <div className="bg-[#1f2029]">
    <div className="grid grid-cols-4">
    <div className="border-r-1 border-gray-500 p-5">
      <div>
        <img src={data.image} alt={`${data.name}`} srcSet="" className="object-cover rounded-2xl w-50 h-50 bg-gray-600" />
      </div>
      <h3 className="py-5 font-bold text-2xl text-white">
        {
          data.name
        }
      </h3>

      <div className="mb-3">
        <h4 className="text-white font-bold">Giới thiệu :</h4>
        <span className="text-sm text-white">{data.info}</span>
      </div>

      <div className="mb-3">
        <h4 className="text-white font-bold">Giới tính :</h4>
        <span className="text-sm text-white">{data.gender}</span>
      </div>

      <div className="mb-3">
        <h4 className="text-white font-bold">Quốc tịch :</h4>
        <span className="text-sm text-white">{data.country}</span>
      </div>

      <div className="mb-3">
        <h4 className="text-white font-bold">Ngày sinh :</h4>
        <span className="text-sm text-white">{convertTime(data.birthday)}</span>
      </div>
    </div>
    <div className="col-span-3 p-5">
      s
    </div>
   </div>
   </div>
    )
}

export default ActorDetailPage