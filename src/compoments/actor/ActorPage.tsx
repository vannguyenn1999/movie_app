import { useQuery } from "@tanstack/react-query";

import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/layouts/loading/Loading2";

const ActorPage = () => {
    const { isPending, data } = useQuery<ActorItem>({
        queryKey: [`ACTOR_ITEM`],
        queryFn: () => getData(`actors/`),
    });

    if (isPending) return <LoadingCompoment />
    
    return (
        <></>
    )
}

export default ActorPage