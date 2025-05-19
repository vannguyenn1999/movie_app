import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { MovieItem } from "@/helpers/models";
import { getData } from "@/core/request";
import LoadingCompoment from "@/layouts/loading/Loading2";

const MovieWatchPage = () => {
    const { slug } = useParams();
    const { isPending, data } = useQuery<MovieItem>({
        queryKey: [`MOVIE_ITEM_WATCH_${slug}`],
        queryFn: () => getData(`movies/?search=${slug}`),
    });

    if (isPending) return <LoadingCompoment />

    return (
        <></>
    )
}

export default MovieWatchPage
