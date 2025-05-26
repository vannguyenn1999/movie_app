import { useState, type FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { Button, Label, Spinner, TextInput , Datepicker } from "flowbite-react";
import { FaSave } from "react-icons/fa";

import type { ActorItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData, updateData } from "@/core/request";
import { toast } from "react-toastify";

type Props = {
  actor: ActorItem;
};

const editActorSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Tối thiểu là 3 ký tự")
    .max(50, "Tối đa là 50 ký tự")
    .required("Tên của diễn viên phải được nhập !"),
});

const ActorEditModalForm: FC<Props> = ({ actor }) => {
  const { refetchCategory } = useListProvider();
  const { setItemIdActorForUpdate } = useListProviderAdmin();
  const [actorForEdit] = useState<ActorItem>({
    ...actor,
  });

  const { imagePreview, handleImageChange } = useImagePreview({
    defaultPreview: {
      path: data ? data.image : "",
      file: null,
    },
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCategory();
    }
    setItemIdActorForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: actorForEdit,
    validationSchema: editActorSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        if (Object(imagePreview)?.file == "") {
          toast.info("Mời bạn chọn ảnh đại diện cho diễn viên !");
          return;
        }

        let dataActor = new FormData();
        dataActor.append("name", values.name);
        dataActor.append("info", values.info);
        dataActor.append("birthday", values.birthday);
        dataActor.append("gender", values.gender);
        dataActor.append("country", values.country);

        if (Object(imagePreview)?.file) {
          dataActor.append("image", Object(imagePreview)?.file);
        }

        if (isNotEmpty(values.id)) {
          await updateData("/actors/", dataActor);
          toast.success("Cập nhật thành công !");
        } else {
          await createData("/actors/", dataActor);
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
        <div className="my-1">
          <div className="mb-2 block">
            <Label htmlFor="password">Tên diễn viên :</Label>
          </div>
          <TextInput
            id="name"
            type="name"
            autoComplete="current-name"
            {...formik.getFieldProps("name")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.name && formik.errors.name,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.name && !formik.errors.name,
              }
            )}
            placeholder="Mời bạn nhập tên của thể loại"
          />
          {formik.touched.name && formik.errors.name && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.name)}
            </span>
          )}
        </div>

        <div className="my-1">
          <div className="mb-2 block">
            <Label htmlFor="info">Giới thiệu :</Label>
          </div>
          <TextInput
            id="info"
            type="info"
            autoComplete="current-info"
            {...formik.getFieldProps("info")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.info && formik.errors.info,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.info && !formik.errors.info,
              }
            )}
            placeholder="Mời bạn nhập tên của thể loại"
          />
          {formik.touched.info && formik.errors.info && (
            <span role="alert" classinfo="text-red-500 text-sm mt-3">
              {String(formik.errors.info)}
            </span>
          )}
        </div>
        
        <div>
          <Datepicker {...formik.getFieldProps("birthday")}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="img_course" value="Ảnh diễn viên" />
          </div>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
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

export default ActorEditModalForm;
