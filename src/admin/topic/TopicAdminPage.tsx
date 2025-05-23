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
import { useState } from "react";

import { useListProvider } from "@/stores/ListProvider";
import type { ID, TopicItem } from "@/helpers/models";
import { formatDate, groupingOnSelect } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { deleteMultiItem } from "@/core/request";

const TopicAdminPage = () => {
  const { dataTopic, refetchTopic } = useListProvider();
  const { setItemIdTopicForUpdate } = useListProviderAdmin();
  const [selectItem, setSelectItem] = useState<ID[]>([]);

  const handleDelete = (ids: ID[]) => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn xóa chủ đề này không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMultiItem("/topics/1/", ids);
          toast.success("Xóa chủ đề thành công");
          refetchTopic();
        }
      });
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Xóa chủ đề không thành công");
    }
  };

  const handleEdit = (id: number) => {
    setItemIdTopicForUpdate(id);
  };

  const handleSelect = (id: number) => {
    groupingOnSelect(id, selectItem, setSelectItem);
  };

  return (
    <>
      <div className="overflow-x-auto h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Quản lý chủ đề</h1>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => setItemIdTopicForUpdate(null)}
              className="ring-0 focus:ring-0 hover:ring-0"
            >
              <div className="flex items-center justify-center gap-1">
                <HiPlusCircle />
                <span>Thêm mới chủ đề</span>
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
                  <span>Xóa {selectItem.length} chủ đề</span>
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
              <TableHeadCell className="text-start">Tên</TableHeadCell>
              <TableHeadCell className="text-center">Ngày tạo</TableHeadCell>
              <TableHeadCell className="text-center">
                Ngày cập nhật
              </TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {Array.isArray(dataTopic) && dataTopic.length > 0 ? (
              <>
                {dataTopic.map((item: TopicItem, index: number) => (
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
                      {item.title}
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
                  colSpan={5}
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

export default TopicAdminPage;
