import { useState, type FC } from "react";
// import * as Yup from "yup";
import { useFormik } from "formik";
// import clsx from "clsx";
import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { FaSave } from "react-icons/fa";

import type { TopMovie } from "@/helpers/models";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData, updateData } from "@/core/request";
import { toast } from "react-toastify";
import { DATA_LEVEL } from "@/helpers/data_ex";
import MovieTable from "../movie/MovieTable";

type Props = {
  movie: TopMovie;
};

const TopMovieEditModalForm: FC<Props> = ({ movie }) => {
  const { setItemIdTopMovieForUpdate } = useListProviderAdmin();
  const [topicForEdit] = useState<TopMovie>({
    ...movie,
  });

  const formik = useFormik({
    initialValues: topicForEdit,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        let result;
        if (isNotEmpty(values.id)) {
          result = await updateData("/top-movies/", values);
        } else {
          result = await createData("/top-movies/", values);
        }

        console.log("result", result);

        if (result !== undefined && "msg" in result) {
          toast.error(`${result.msg}`);
        } else {
          if (isNotEmpty(values.id)) {
            toast.success("Cập nhật thành công !");
          } else {
            toast.success("Thêm mới thành công !");
          }
          setItemIdTopMovieForUpdate(undefined);
        }
      } catch (ex) {
        console.error(ex);
        toast.error("Đã xảy ra lỗi vui lòng kiểm tra lại !");
      } finally {
        setSubmitting(true);
      }
    },
  });
  return (
    <>
      <form className="form" onSubmit={formik.handleSubmit} noValidate>
        <>{formik.values.id === 0 && <MovieTable formik={formik} />}</>
        <>
          {formik.values.id !== 0 && (
            <TextInput
              id="title"
              type="text"
              autoComplete="current-title"
              {...formik.getFieldProps("movie.title")}
              className="dark:bg-gray-700 dark:placeholder-gray-400 rounded-lg bg-gray-500 mb-5"
              readOnly
            />
          )}
        </>
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
