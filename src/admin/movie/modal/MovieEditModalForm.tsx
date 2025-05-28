import { useState, type FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import {
  Button,
  Label,
  Spinner,
  TextInput,
  FileInput,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { HiOutlineUpload, HiOutlineXCircle } from "react-icons/hi";

import type { MovieItem } from "@/helpers/models";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData2, updateData2 } from "@/core/request";
import { useImagePreview } from "@/helpers/hook";
import MovieOtherData from "./other/MovieOtherData";
import SelectCompoment from "./actor/SelectCompoment";
import MovieOtherData2 from "./other/MovieOtherData2";

type Props = {
  movie: MovieItem;
};

const editMovieSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Tối thiểu là 3 ký tự")
    .max(50, "Tối đa là 50 ký tự")
    .required("Tên của phim phải được nhập !"),
  description: Yup.string()
    .min(3, "Tối thiểu là 3 ký tự")
    .max(500, "Tối đa là 500 ký tự")
    .required("Giới thiệu cho phim phải được nhập !"),
});

const MovieEditModalForm: FC<Props> = ({ movie }) => {
  const { setItemIdMovieForUpdate } = useListProviderAdmin();
  const [movieForEdit] = useState<MovieItem>({
    ...movie,
    release_date: movie.release_date ? new Date(movie.release_date) : "",
  });

  const { imagePreview, handleImageChange } = useImagePreview({
    defaultPreview: {
      path: movie.image ? movie.image : "",
      file: null,
    },
  });

  const formik = useFormik({
    initialValues: movieForEdit,
    validationSchema: editMovieSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log("vaaaa", values);
        return;

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        if (Object(imagePreview)?.file == "") {
          toast.info("Mời bạn chọn ảnh đại diện cho bộ phim !");
          return;
        }
        const dataMovie = new FormData();

        dataMovie.append("title", values.title ? values.title : "");
        dataMovie.append("imdb", values.title ? values.title : "5");
        dataMovie.append("rating", values.title ? values.title : "5");
        dataMovie.append("duration", values.duration ? values.duration : "1h");
        dataMovie.append(
          "actor",
          values.actor ? JSON.stringify(values.actor) : "[]"
        );
        dataMovie.append(
          "category",
          values.category ? JSON.stringify(values.category) : "[]"
        );
        dataMovie.append(
          "topic",
          values.topic ? JSON.stringify(values.topic) : "[]"
        );
        dataMovie.append(
          "country",
          values.actor ? JSON.stringify(values.actor) : "[]"
        );
        dataMovie.append(
          "description",
          values.description ? values.description : ""
        );
        dataMovie.append(
          "release_date",
          values.release_date
            ? typeof values.release_date === "string"
              ? values.release_date
              : values.release_date.toISOString().split("T")[0]
            : ""
        );

        dataMovie.append(
          "language",
          values.language ? values.language : "Việt nam"
        );

        if (Object(imagePreview)?.file) {
          dataMovie.append("image", Object(imagePreview)?.file);
        }

        if (isNotEmpty(values.id)) {
          await updateData2("/movies/", values.id, dataMovie, config);
          toast.success("Cập nhật thành công !");
        } else {
          await createData2("/movies/", dataMovie, config);
          toast.success("Thêm mới thành công !");
        }
      } catch (ex) {
        console.error(ex);
        toast.error("Đã xảy ra lỗi vui lòng kiểm tra lại !");
      } finally {
        setSubmitting(true);
        setItemIdMovieForUpdate(undefined);
      }
    },
  });

  return (
    <>
      <form className="form" onSubmit={formik.handleSubmit} noValidate>
        {/* Tên diễn viên */}
        <div className="my-1">
          <div className="mb-2 block">
            <Label htmlFor="password">Tên phim :</Label>
          </div>
          <TextInput
            id="title"
            type="text"
            autoComplete="current-title"
            {...formik.getFieldProps("title")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.title && formik.errors.title,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.title && !formik.errors.title,
              }
            )}
            placeholder="Mời bạn nhập tên của bộ phim"
          />
          {formik.touched.title && formik.errors.title && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.title)}
            </span>
          )}
        </div>

        {/* Giới thiệu */}
        <div className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="info">Giới thiệu :</Label>
          </div>
          <Textarea
            id="description"
            rows={5}
            autoComplete="current-description"
            {...formik.getFieldProps("description")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.description && formik.errors.description,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.description && !formik.errors.description,
              }
            )}
            placeholder="Mời bạn nhập giới thiệu cho bộ phim"
          />
          {formik.touched.description && formik.errors.description && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.description)}
            </span>
          )}
        </div>

        <>
          <MovieOtherData2 formik={formik} />
        </>

        <>
          <MovieOtherData formik={formik} />
          <SelectCompoment formik={formik} />
        </>
        <div className="grid grid-cols-3 gap-4 my-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="img_course">Ảnh đại diện :</Label>
            </div>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5 text-2xl">
                  <HiOutlineUpload />
                </div>
                <FileInput
                  onChange={(event) => handleImageChange(event)}
                  id="dropzone-file"
                  className="hidden"
                  accept=".jpg,.png"
                />
              </Label>
            </div>

            {Object(imagePreview)?.path !== "" && (
              <div className="flex items-center justify-center my-5 relative">
                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="absolute top-0 right-0 p-5 cursor-pointer"
                >
                  <HiOutlineXCircle className="text-2xl" />
                </button>
                <img
                  src={Object(imagePreview)?.path}
                  alt=""
                  className="h-auto max-w-50 rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img_course">Ảnh bìa :</Label>
            </div>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5 text-2xl">
                  <HiOutlineUpload />
                </div>
                <FileInput
                  onChange={(event) => handleImageChange(event)}
                  id="dropzone-file"
                  className="hidden"
                  accept=".jpg,.png"
                />
              </Label>
            </div>

            {Object(imagePreview)?.path !== "" && (
              <div className="flex items-center justify-center my-5 relative">
                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="absolute top-0 right-0 p-5 cursor-pointer"
                >
                  <HiOutlineXCircle className="text-2xl" />
                </button>
                <img
                  src={Object(imagePreview)?.path}
                  alt=""
                  className="h-auto max-w-50 rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img_course">Video :</Label>
            </div>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5 text-2xl">
                  <HiOutlineUpload />
                </div>
                <FileInput
                  onChange={(event) => handleImageChange(event)}
                  id="dropzone-file"
                  className="hidden"
                  accept=".jpg,.png"
                />
              </Label>
            </div>

            {Object(imagePreview)?.path !== "" && (
              <div className="flex items-center justify-center my-5 relative">
                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="absolute top-0 right-0 p-5 cursor-pointer"
                >
                  <HiOutlineXCircle className="text-2xl" />
                </button>
                <img
                  src={Object(imagePreview)?.path}
                  alt=""
                  className="h-auto max-w-50 rounded-lg"
                />
              </div>
            )}
          </div>
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

export default MovieEditModalForm;
