/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import {
  HiFolder,
  HiOutlineFilm,
  HiOutlineSearch,
  HiPencil,
  HiPlusCircle,
  HiTag,
  HiTrash,
  HiUserGroup,
} from "react-icons/hi";

import { deleteMultiItem, getData } from "@/core/request";
import LoadingCompoment from "@/compoments/loading/Loading2";
import type {
  ActorItem,
  CategoryItem,
  ID,
  MovieItem,
  TopicItem,
} from "@/helpers/models";
import { Link } from "react-router-dom";
import { convertTime, groupingOnSelect } from "@/helpers/functions";
import { useEffect, useState } from "react";
import { useDebounce } from "@/helpers/hook";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import PaginationCompoment from "@/helpers/compoments/PaginationCompoment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MovieAdminPage = () => {
  const [selectItem, setSelectItem] = useState<ID[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 300);
  const { setItemIdMovieForUpdate, itemIdMovieForUpdate } =
    useListProviderAdmin();

  const { isPending, data, refetch } = useQuery({
    queryKey: [`MOVIE_ADMIN_${page}_${debouncedSearchTerm}`],
    queryFn: () =>
      getData(`movies/?page=${page}&search=${debouncedSearchTerm}`),
  });

  useEffect(() => {
    refetch();
  }, [itemIdMovieForUpdate]);

  const handleSelect = (id: number) => {
    groupingOnSelect(id, selectItem, setSelectItem);
  };

  const handSearch = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  const handleDelete = (ids: ID[]) => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn xóa bộ phim này không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMultiItem("/movies/1/", ids);
          toast.success("Xóa bộ phim thành công");
          refetch();
          setSelectItem([]);
        }
      });
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Xóa bộ phim không thành công");
    }
  };

  const handleEdit = (id: number) => {
    setItemIdMovieForUpdate(id);
  };

  return (
    <div className="h-screen">
      <h1 className="text-xl font-bold">Quản lý Phim</h1>
      <div className="flex justify-start items-center my-4">
        <div className="max-w-xl me-4">
          <TextInput
            // ref={inputRefs}
            id="search"
            type="text"
            icon={HiOutlineSearch}
            placeholder="Tìm phim"
            onChange={(e) => handSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setItemIdMovieForUpdate(null)}
          className="ring-0 focus:ring-0 hover:ring-0"
        >
          <div className="flex items-center justify-center gap-1">
            <HiPlusCircle />
            <span>Thêm phim mới</span>
          </div>
        </Button>
        {selectItem.length > 0 && (
          <Button
            onClick={() => handleDelete(selectItem)}
            color="red"
            className="ring-0 focus:ring-0 hover:ring-0 ms-2"
          >
            <div className="flex items-center justify-center gap-1">
              <HiTrash />
              <span>Xóa {selectItem.length} phim</span>
            </div>
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell className="text-center"></TableHeadCell>
              <TableHeadCell className="text-center">STT</TableHeadCell>
              <TableHeadCell className="text-center min-w-[200px]">
                Chủ để{" "}
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[200px]">
                Giới thiệu
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[160px]">
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
              <TableHeadCell className="text-center min-w-[100px]">
                Phim
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[120px]">
                Ngôn ngữ
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[130px]">
                Thể loại
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[120px]">
                Chủ đề
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[120px]">
                Diễn viên
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[120px]">
                Quốc gia
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[150px]">
                Quảng cáo
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[120px] ">
                Trang chủ
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[150px]">
                Ngày tạo
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[150px]">
                Ngày cập nhật
              </TableHeadCell>
              <TableHeadCell className="text-center min-w-[200px]">
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {!isPending && data && data?.results.length > 0 ? (
              <>
                {data?.results.map((item: MovieItem, index: number) => (
                  <TableRow
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="p-4">
                      <Checkbox
                        onClick={() => handleSelect(item.id)}
                        className="ring-0 focus:ring-0 hover:ring-0"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-sm text-gray-900 dark:text-white text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell>
                      {item.description && item.description.slice(0, 50)}...
                    </TableCell>
                    <TableCell className="text-center">
                      {item.release_date &&
                        convertTime(String(item.release_date))}
                    </TableCell>
                    <TableCell className="text-center">{item.rating}</TableCell>
                    <TableCell className="text-center">{item.imdb}</TableCell>
                    <TableCell className="text-center">
                      {item.duration}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <img
                          src={item.image ? String(item.image) : ""}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <img
                          src={
                            item.image_avatar ? String(item.image_avatar) : ""
                          }
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        to={item.video ? String(item.video) : ""}
                        target="_blank"
                        className="flex items-center justify-center"
                      >
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full">
                          <HiOutlineFilm />
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.language}
                    </TableCell>
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
                      {item.created_at ? convertTime(item.created_at) : ""}
                    </TableCell>
                    <TableCell className="text-center text-[12px]">
                      {item.updated_at ? convertTime(item.updated_at) : ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <HiPencil
                          className="text-lg cursor-pointer"
                          onClick={() => handleEdit(item.id)}
                        />
                        <HiTrash
                          className="ms-2 text-lg cursor-pointer"
                          onClick={() => handleDelete([item.id])}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell
                  colSpan={21}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"
                >
                  {isPending ? (
                    <LoadingCompoment />
                  ) : (
                    <span>Không có dữ liệu</span>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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

export default MovieAdminPage;
