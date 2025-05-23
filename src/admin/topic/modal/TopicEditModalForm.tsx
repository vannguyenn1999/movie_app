import { useState, type FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaSave } from "react-icons/fa";

import type { TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData, updateData } from "@/core/request";

type Props = {
  topic: TopicItem;
};

const editTopicSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Tối thiểu là 3 ký tự")
    .max(50, "Tối đa là 50 ký tự")
    .required("Tên của chủ đề phải được nhập !"),
});

const TopicEditModalForm: FC<Props> = ({ topic }) => {
  const { refetchTopic } = useListProvider();
  const { setItemIdTopicForUpdate } = useListProviderAdmin();
  const [topicForEdit] = useState<TopicItem>({
    ...topic,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchTopic();
    }
    setItemIdTopicForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: topicForEdit,
    validationSchema: editTopicSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          console.log("Cập nhật : ", values);

          await updateData("/topics/", values);
        } else {
          console.log("Thêm mới : ", values);
          await createData("/topics/", { title: values.title });
        }
      } catch (ex) {
        console.error(ex);
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
            <Label htmlFor="password">Tiêu đề :</Label>
          </div>
          <TextInput
            id="title"
            type="title"
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
            placeholder="Mời bạn nhập tên của chủ đề"
          />
          {formik.touched.title && formik.errors.title && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.title)}
            </span>
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

export default TopicEditModalForm;
