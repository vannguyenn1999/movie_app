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
import type { CategoryItem, ID } from "@/helpers/models";
import { formatDate, groupingOnSelect } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { deleteMultiItem } from "@/core/request";

const CategoryAdminPage = () => {
  const { dataCategory, refetchCategory } = useListProvider();
  const { setItemIdCategoryForUpdate } = useListProviderAdmin();
  const [selectItem, setSelectItem] = useState<ID[]>([]);

  const handleDelete = (ids: ID[]) => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn xóa thể loại này không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMultiItem("/categories/1/", ids);
          toast.success("Xóa thể loại thành công");
          refetchCategory();
        }
      });
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Xóa thể loại không thành công");
    }
  };

  const handleEdit = (id: number) => {
    setItemIdCategoryForUpdate(id);
  };

  const handleSelect = (id: number) => {
    groupingOnSelect(id, selectItem, setSelectItem);
  };

  return (
    <>
      <div className="overflow-x-auto h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Quản lý thể loại</h1>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => setItemIdCategoryForUpdate(null)}
              className="ring-0 focus:ring-0 hover:ring-0"
            >
              <div className="flex items-center justify-center gap-1">
                <HiPlusCircle />
                <span>Thêm mới thể loại</span>
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
                  <span>Xóa {selectItem.length} thể loại</span>
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
            {Array.isArray(dataCategory) && dataCategory.length > 0 ? (
              <>
                {dataCategory.map((item: CategoryItem, index: number) => (
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

export default CategoryAdminPage;
