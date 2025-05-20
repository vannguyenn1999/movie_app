import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Button } from "flowbite-react";

const DATA_TEST = [
    {
        id: 1,
        img: "https://cdn.mohinhcaocap.com/wp-content/uploads/2025/04/15154139/bff14fc1c43166b5c0fe1f341cdbfa91-w1200h1200-370x475.jpg",
        img2: "https://media.baothaibinh.com.vn/upload/news/11_2024/se_co_series_phim_hoat_hinh_danh_cho_tre_em_ve_sieu_anh_hung_iron_man_12055002112024.jpg",
        name: '11111111111111111111',
        category: [
            {
                id: 1,
                name: 'Hành động'
            },
            {
                id: 2,
                name: 'Hài hước'
            },
            {
                id: 3,
                name: 'Kinh dị'
            }
        ],
        imdb: 8.5,
        year: 2024,
        time: '2h34'
    },
    {
        id: 2,
        img: "https://cdn.mohinhcaocap.com/wp-content/uploads/2025/04/15154139/bff14fc1c43166b5c0fe1f341cdbfa91-w1200h1200-370x475.jpg",
        img2: "https://media.baothaibinh.com.vn/upload/news/11_2024/se_co_series_phim_hoat_hinh_danh_cho_tre_em_ve_sieu_anh_hung_iron_man_12055002112024.jpg",

        name: '2222222222222222222222',
        category: [
            {
                id: 1,
                name: 'Hành động'
            },
            {
                id: 2,
                name: 'Hài hước'
            },
            {
                id: 3,
                name: 'Kinh dị'
            }
        ],
        imdb: 8.5,
        year: 2024,
        time: '2h34'
    }
]

const MovieItem = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {DATA_TEST.map((item) => (
                <>
                    <div className="cursor-pointer group relative w-auto inline-block " key={item.id}>
                        <div className="flex justify-center items-center">

                            <img className="block rounded-2xl object-cover" src={item.img} alt="" srcSet="" />
                        </div>
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 flex flex-col items-center justify-center duration-500 mx-2">
                            <div className="relative w-full h-full overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center rounded-2xl z-50 h-52"
                                    style={{
                                        backgroundImage: `url(${item.img2})`,
                                    }}
                                >
                                    <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent"></div>

                                </div>
                                <div className="absolute bottom-20 z-50 px-3">
                                    <span className="text-white">{item.name}</span>
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
                                            {item.imdb}
                                        </span>

                                        <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                                            {item.year}
                                        </span>

                                        <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                                            {item.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start my-2">
                                        {
                                            item.category.map((category) => (
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
                </>
            ))}



        </div>
    )
}

export default MovieItem