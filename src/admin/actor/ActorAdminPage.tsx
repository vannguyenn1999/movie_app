/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
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
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import { deleteMultiItem, getData } from "@/core/request";
import type { ActorItem, ID } from "@/helpers/models";
import { convertTime, formatDate, groupingOnSelect } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { toast } from "react-toastify";
import LoadingCompoment from "@/compoments/loading/Loading2";

const ActorAdminPage = () => {
  const [selectItem, setSelectItem] = useState<ID[]>([]);
  const { setItemIdActorForUpdate, itemIdActorForUpdate } =
    useListProviderAdmin();

  const {
    isPending,
    data: dataActor,
    refetch,
  } = useQuery({
    queryKey: [`DATA_ADMIN_ACTOR`],
    queryFn: () => getData(`/actors/`),
  });

  useEffect(() => {
    refetch();
  }, [itemIdActorForUpdate]);

  const handleSelect = (id: number) => {
    groupingOnSelect(id, selectItem, setSelectItem);
  };

  const handleDelete = (ids: ID[]) => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn xóa diễn viên này không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMultiItem("/actors/1/", ids);
          toast.success("Xóa diễn viên thành công");
          refetch();
        }
      });
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Xóa diễn viên không thành công");
    }
  };

  const handleEdit = (id: number) => {
    setItemIdActorForUpdate(id);
  };

  return (
    <div className="overflow-x-auto h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý diễn viên</h1>
        <div className="flex justify-end items-center">
          <Button
            onClick={() => setItemIdActorForUpdate(null)}
            className="ring-0 focus:ring-0 hover:ring-0"
          >
            <div className="flex items-center justify-center gap-1">
              <HiPlusCircle />
              <span>Thêm mới diễn viên</span>
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
                <span>Xóa {selectItem.length} diễn viên</span>
              </div>
            </Button>
          )}
        </div>
      </div>
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="text-center"></TableHeadCell>
            <TableHeadCell className="text-center">STT</TableHeadCell>
            <TableHeadCell className="text-center">Tên</TableHeadCell>
            <TableHeadCell className="text-center">Thông tin</TableHeadCell>
            <TableHeadCell className="text-center">Ảnh</TableHeadCell>
            <TableHeadCell className="text-center">Ngày sinh</TableHeadCell>
            <TableHeadCell className="text-center">Giới tính</TableHeadCell>
            <TableHeadCell className="text-center">Quốc gia</TableHeadCell>
            <TableHeadCell className="text-center">Ngày tạo</TableHeadCell>
            <TableHeadCell className="text-center">Ngày cập nhật</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {!isPending &&
          Array.isArray(dataActor?.results) &&
          dataActor?.results.length > 0 ? (
            <>
              {dataActor?.results.map((item: ActorItem, index: number) => (
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
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-start">
                    {item.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-start cursor-pointer">
                    {item.info ? item.info.slice(0, 20) : ""}...
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.birthday ? convertTime(String(item.birthday)) : ""}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    <div
                      className={`flex justify-center items-center p-2 rounded-2xl w-[50px] text-[10px] text-white text-center mx-auto ${
                        item.gender === "Male" ? "bg-blue-400" : "bg-pink-400"
                      }`}
                    >
                      {item.gender === "Male" ? "Nam" : "Nữ"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.country}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.created_at ? formatDate(item.created_at) : ""}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.updated_at ? formatDate(item.updated_at) : ""}
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
                colSpan={11}
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
  );
};

export default ActorAdminPage;
