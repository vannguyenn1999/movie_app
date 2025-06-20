import { useQuery } from "@tanstack/react-query";
import { lazy, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiPencil, HiPlusCircle, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { deleteMultiItem, getData } from "@/core/request";
import type { ID, TopMovie } from "@/helpers/models";
import { convertTime, groupingOnSelect } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import MovidCardItemCompoment from "@/compoments/movie/item/MovieCardItem";

const LoadingCompoment = lazy(() => import("@/compoments/loading/Loading2"));

const TopMoviePage = () => {
  const [selectItem, setSelectItem] = useState<ID[]>([]);
  const { setItemIdTopMovieForUpdate, itemIdTopMovieForUpdate } =
    useListProviderAdmin();

  const { isPending, data, refetch } = useQuery({
    queryKey: [`DATA_ADMIN_TOPMOVIE`],
    queryFn: () => getData(`/top-movies/`),
  });

  useEffect(() => {
    if (itemIdTopMovieForUpdate === undefined) {
      refetch();
    }
  }, [itemIdTopMovieForUpdate]);

  const handleDelete = (ids: ID[]) => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn xóa phim này không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMultiItem("/top-movies/1/", ids);
          toast.success("Xóa phim thành công");
          refetch();
          setSelectItem([]);
        }
      });
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Xóa phim không thành công");
    }
  };

  const handleSelect = (id: number) => {
    groupingOnSelect(id, selectItem, setSelectItem);
  };
  if (isPending) return <LoadingCompoment />;

  // console.log("data", data);

  return (
    <>
      <div className="overflow-x-auto h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Quản lý Top phim</h2>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => setItemIdTopMovieForUpdate(null)}
              className="ring-0 focus:ring-0 hover:ring-0"
            >
              <div className="flex items-center justify-center gap-1">
                <HiPlusCircle />
                <span>Thêm mới</span>
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
        </div>
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell className="text-center"></TableHeadCell>
              {/* <TableHeadCell className="text-center">STT</TableHeadCell> */}
              <TableHeadCell className="text-center">Phim</TableHeadCell>
              <TableHeadCell className="text-center max-w-[200px]">
                Xếp hạng
              </TableHeadCell>
              <TableHeadCell className="text-center max-w-[200px]">
                Ngày tạo
              </TableHeadCell>
              <TableHeadCell className="text-center max-w-[200px]">
                Ngày cập nhật
              </TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {Array.isArray(data) && data.length > 0 ? (
              <>
                {data.map((item: TopMovie) => (
                  <TableRow
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={item.id}
                  >
                    <TableCell className="p-4">
                      <Checkbox
                        onClick={() => handleSelect(item.id)}
                        className="ring-0 focus:ring-0 hover:ring-0"
                      />
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-start">
                      <MovidCardItemCompoment
                        title={item.movie?.title || ""}
                        image={String(item.movie?.image)}
                        duration={item.movie?.duration || ""}
                        release_date={String(item.movie?.release_date)}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center max-w-[200px]s">
                      {item.level}
                    </TableCell>
                    <TableCell className="text-center text-sm max-w-[200px]">
                      {item.created_at ? convertTime(item.created_at) : ""}
                    </TableCell>
                    <TableCell className="text-center text-sm max-w-[200px]">
                      {item.updated_at ? convertTime(item.updated_at) : ""}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center items-center">
                        <HiPencil
                          className="text-lg cursor-pointer"
                          onClick={() => setItemIdTopMovieForUpdate(item.id)}
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
                  colSpan={6}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default TopMoviePage;
