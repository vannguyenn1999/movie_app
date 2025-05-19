import { useParams , Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getData } from '@/core/request';
import type { MovieItem } from '@/helpers/models';
import LoadingCompoment from '@/layouts/loading/Loading2';



const MoviePage = () => {

    const { type, slug } = useParams();

    if (!['chu-de', 'the-loai', 'quoc-gia'].includes(type)) {
        return <Navigate to="/home" />;
    }

    const { isPending, data } = useQuery<MovieItem>({
        queryKey: [`MOVIE_ITEM_DETAIL_${slug}`],
        queryFn: () => getData(`movies/?search=${slug}`),
    });

    if (isPending) return <LoadingCompoment />

    return (
        <></>
    )
}

export default MoviePage