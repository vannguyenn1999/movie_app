import { useState, type FC } from "react";
// import * as Yup from "yup";
import { useFormik } from "formik";
// import clsx from "clsx";
import { Button, Label, Select, Spinner } from "flowbite-react";
import { FaSave } from "react-icons/fa";

import type { TopMovie } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData, updateData } from "@/core/request";
import { toast } from "react-toastify";
import { DATA_LEVEL } from "@/helpers/data_ex";

type Props = {
  movie: TopMovie;
};

const TopMovieEditModalForm: FC<Props> = ({ movie }) => {
  const { refetchCategory } = useListProvider();
  const { setItemIdCategoryForUpdate } = useListProviderAdmin();
  const [topicForEdit] = useState<TopMovie>({
    ...movie,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCategory();
    }
    setItemIdCategoryForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: topicForEdit,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateData("/categories/", values);
          toast.success("Cập nhật thành công !");
        } else {
          await createData("/categories/", values);
          toast.success("Thêm mới thành công !");
        }
      } catch (ex) {
        console.error(ex);
        toast.error("Đã xảy ra lỗi vui lòng kiểm tra lại !");
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    },
  });
  return (
    <>
      <form className="form" onSubmit={formik.handleSubmit} noValidate>
        <div>
          <Label htmlFor="birthday" className="mb-2 block">
            Xếp hạng :
          </Label>
          <Select
            id="level"
            {...formik.getFieldProps("level")}
            value={formik.values.level}
            onChange={formik.handleChange}
          >
            {DATA_LEVEL.map((level) => (
              <option key={level.value} value={level.label}>
                {level.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full flex items-center justify-center my-5">
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            className="ring-0 hover:ring-0 focus:ring-0 cursor-pointer"
          >
            {formik.isSubmitting ? (
              <>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Vui lòng chờ ...</span>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <FaSave className="me-2" />
                <span>Lưu</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TopMovieEditModalForm;
