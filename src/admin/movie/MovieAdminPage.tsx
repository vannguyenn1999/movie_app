import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  HiFolder,
  HiOutlineFilm,
  HiPencil,
  HiTag,
  HiTrash,
  HiUserGroup,
} from "react-icons/hi";

import { getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import type {
  ActorItem,
  CategoryItem,
  MovieItem,
  TopicItem,
} from "@/helpers/models";
import { Link } from "react-router-dom";
import { convertTime, formatDate } from "@/helpers/functions";

const MovieAdminPage = () => {
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ADMIN`],
    queryFn: () => getData(`movies/`),
  });

  if (isPending) return <LoadingCompoment />;
  return (
    <div className="overflow-x-auto h-screen">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="text-center min-w-[200px]">
              Chủ để{" "}
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Giới thiệu
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Ngày phát hành
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[130px]">
              Đánh giá
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[30px]">
              IMBd
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[130px]">
              Thời lượng
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Ảnh Nền
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Hình ảnh
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Phim
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Ngôn ngữ
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Thể loại
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Chủ đề
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Diễn viên
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Quốc gia
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Quảng cáo
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px] ">
              Trang chủ
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Ngày tạo
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              Ngày cập nhật
            </TableHeadCell>
            <TableHeadCell className="text-center min-w-[200px]">
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data ? (
            <>
              {data?.results.map((item: MovieItem) => (
                <TableRow
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="text-center">{item.title}</TableCell>
                  <TableCell>{item.description.slice(0, 50)}...</TableCell>
                  <TableCell className="text-center">
                    {convertTime(item.release_date)}
                  </TableCell>
                  <TableCell className="text-center">{item.rating}</TableCell>
                  <TableCell className="text-center">{item.imdb}</TableCell>
                  <TableCell className="text-center">{item.duration}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <img
                        src={item.image ? item.image : ""}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <img
                        src={item.image_avatar ? item.image_avatar : ""}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={item.video ? item.video : ""}
                      target="_blank"
                      className="flex items-center justify-center"
                    >
                      <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full">
                        <HiOutlineFilm />
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{item.language}</TableCell>
                  <TableCell className="">
                    <div className="cursor-pointer flex justify-center items-center cursor-pointer group relative">
                      <HiFolder />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[350px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                        <div className="grid grid-cols-3 p-2">
                          {Array.isArray(item.category) &&
                            item.category.map((cate: CategoryItem) => (
                              <div
                                className="p-3 rounded-xl bg-gray-400 text-center text-sm m-1"
                                key={cate.id}
                              >
                                <span className="text-center text-[10px]">
                                  {cate.name}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="cursor-pointer flex justify-center items-center cursor-pointer group relative">
                      <HiTag />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[350px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                        <div className="grid grid-cols-3 p-2">
                          {Array.isArray(item.topic) &&
                            item.topic.map((tp: TopicItem) => (
                              <div
                                className="p-3 rounded-xl bg-gray-400 text-center text-sm m-1"
                                key={tp.id}
                              >
                                <span className="text-center text-[10px]">
                                  {tp.title}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="cursor-pointer flex justify-center items-center cursor-pointer group relative">
                      <HiUserGroup />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[350px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                        <div className="grid grid-cols-3 p-2">
                          {Array.isArray(item.actor) &&
                            item.actor.map((ac: ActorItem) => (
                              <div
                                className="p-3 rounded-xl  text-center text-sm"
                                key={ac.id}
                              >
                                <Avatar img={ac.image} size="md" rounded />
                                <span className="text-center text-[10px]">
                                  {ac.name}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {item.country?.name}
                  </TableCell>
                  <TableCell className="">
                    <div
                      className={`flex justify-center items-center p-2 rounded-2xl w-[50px] text-[10px] text-white text-center mx-auto ${
                        item.is_ads ? "bg-green-400" : "bg-red-400"
                      }`}
                    >
                      {item.is_ads ? "Có" : "Không"}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div
                      className={`flex justify-center items-center p-2 rounded-2xl w-[50px] text-[10px] text-white text-center mx-auto ${
                        item.is_banner ? "bg-green-400" : "bg-red-400"
                      }`}
                    >
                      {item.is_banner ? "Có" : "Không"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-[12px]">
                    {item.created_at ? formatDate(item.created_at) : ""}
                  </TableCell>
                  <TableCell className="text-center text-[12px]">
                    {item.updated_at ? formatDate(item.updated_at) : ""}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <HiPencil />
                      <HiTrash className="ms-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MovieAdminPage;
