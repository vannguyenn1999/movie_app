import { FC } from "react"
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Button } from "flowbite-react";


type MovieItemProps = {
    id: number,
    img: string,
    img2: string,
    name: string,
    category: {
        id: number,
        name: string
    }[],
    imdb: number,
    year: number,
    time: string
}


const MovieItem: FC<MovieItemProps> = ({ id, img, img2, name, category, imdb, year, time }) => {
    return (
        <div className="cursor-pointer group relative w-auto inline-block " key={id}>
            <div className="flex justify-center items-center">

                <img className="block rounded-2xl object-cover" src={img} alt="" srcSet="" />
            </div>
            <div className="absolute inset-0 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 flex flex-col items-center justify-center duration-500 mx-2">
                <div className="relative w-full h-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center rounded-2xl z-50 h-52"
                        style={{
                            backgroundImage: `url(${img2})`,
                        }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent"></div>

                    </div>
                    <div className="absolute bottom-14 z-50 px-3">
                        <span className="text-white">{name}</span>
                        <div className="flex items-center justify-center my-2">
                            <Button color="yellow" outline className="cursor-pointer px-10">
                                <FaPlay />
                                <span className="ms-2">Xem ngay</span>
                            </Button>

                            <Button color="red" outline className=" cursor-pointer mx-3">
                                <FaHeart />
                                <span className="ms-2">Thích</span>
                            </Button>

                            <Button color="purple" outline className="cursor-pointer">
                                <FaInfoCircle />
                                <span className="ms-2">Chi tiết</span>
                            </Button>
                        </div>
                        <div className="flex items-center justify-start my-3">
                            <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 outline outline-amber-300  mx-1">
                                {imdb}
                            </span>

                            <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                                {year}
                            </span>

                            <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                                {time}
                            </span>
                        </div>
                        <div className="flex items-center justify-start my-2">
                            {
                                category.map((category) => (
                                    <span key={category.id} className="text-white text-sm bg-gray-700 rounded-full px-2 py-1 mx-1">
                                        {category.name}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default MovieItem;