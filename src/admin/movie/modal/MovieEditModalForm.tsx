import { useState, type FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { Button, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

import type { MovieItem } from "@/helpers/models";
import { convertArray, convertTime, isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData2, updateData2 } from "@/core/request";
import MovieOtherData from "./other/MovieOtherData";
import ActorSelectCompoment from "./actor/ActorSelectCompoment";
import MovieOtherData2 from "./other/MovieOtherData2";
import ImageCompoment from "./imgAndVideo/Image";
import ThumbCompoment from "./imgAndVideo/Thumb";
import VideoCompoment from "./imgAndVideo/Video";

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
    .max(1000, "Tối đa là 1000 ký tự")
    .required("Giới thiệu cho phim phải được nhập !"),
});

const MovieEditModalForm: FC<Props> = ({ movie }) => {
  const { setItemIdMovieForUpdate } = useListProviderAdmin();
  const [movieForEdit] = useState<MovieItem>({
    ...movie,
    release_date: movie.release_date ? new Date(movie.release_date) : "",
    title: movie.title || "",
    description: movie.description || "",
    imdb: movie.imdb || 0,
    duration: movie.duration || "",
  });

  const formik = useFormik({
    initialValues: movieForEdit,
    validationSchema: editMovieSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        if (values.image_avatar === undefined) {
          toast.info("Mời bạn chọn ảnh đại diện cho bộ phim !");
          return;
        }

        if (values.image === undefined) {
          toast.info("Mời bạn chọn ảnh bìa cho bộ phim !");
          return;
        }

        if (values.video === undefined) {
          toast.info("Mời bạn chọn bộ phim !");
          return;
        }

        const dataMovie = new FormData();

        dataMovie.append("title", values.title ? values.title : "");
        dataMovie.append(
          "imdb",
          values.imdb ? String(Number(values.imdb)) : "5"
        );
        dataMovie.append(
          "rating",
          values.rating ? String(Number(values.rating)) : "5"
        );
        dataMovie.append("duration", values.duration ? values.duration : "1h");
        dataMovie.append(
          "actor",
          values.actor ? convertArray(values.actor) : ""
        );
        dataMovie.append(
          "category",
          values.category ? convertArray(values.category) : ""
        );
        dataMovie.append(
          "topic",
          values.topic ? convertArray(values.topic) : ""
        );
        dataMovie.append(
          "country",
          values.country ? convertArray(values.country) : ""
        );
        dataMovie.append(
          "description",
          values.description ? values.description : ""
        );
        dataMovie.append("is_ads", values.is_ads ? "true" : "false");
        dataMovie.append("is_banner", values.is_banner ? "true" : "false");
        dataMovie.append(
          "release_date",
          values.release_date
            ? typeof values.release_date === "string"
              ? values.release_date
              : convertTime(String(values.release_date), 2)
            : ""
        );

        dataMovie.append(
          "language",
          values.language ? values.language : "Việt nam"
        );

        if (values.image && values.image instanceof File) {
          dataMovie.append("image", values.image);
        }

        if (values.image_avatar && values.image_avatar instanceof File) {
          dataMovie.append("image_avatar", values.image_avatar);
        }

        if (values.video && values.video instanceof File) {
          dataMovie.append("video", values.video);
        }

        if (isNotEmpty(values.id)) {
          await updateData2("/movies/", values.id, dataMovie, config);
          toast.success("Cập nhật thành công !");
        } else {
          await createData2("/movies/", dataMovie, config);
          toast.success("Thêm mới thành công !");
        }
        setItemIdMovieForUpdate(undefined);
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
          <ActorSelectCompoment formik={formik} />
          <MovieOtherData formik={formik} />
        </>
        <div className="grid grid-cols-3 gap-4 my-3">
          <>
            <ImageCompoment formik={formik} />
          </>
          <>
            <ThumbCompoment formik={formik} />
          </>
          <>
            <VideoCompoment formik={formik} />
          </>
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
