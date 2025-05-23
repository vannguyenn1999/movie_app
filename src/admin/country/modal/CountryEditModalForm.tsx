import { useState, type FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaSave } from "react-icons/fa";

import type { CountryItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { createData, updateData } from "@/core/request";

type Props = {
  country: CountryItem;
};

const editTopicSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Tối thiểu là 3 ký tự")
    .max(50, "Tối đa là 50 ký tự")
    .required("Tên của quốc gia phải được nhập !"),
});

const CountryEditModalForm: FC<Props> = ({ country }) => {
  const { refetchCountry } = useListProvider();
  const { setItemIdCountryForUpdate } = useListProviderAdmin();
  const [topicForEdit] = useState<CountryItem>({
    ...country,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCountry();
    }
    setItemIdCountryForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: topicForEdit,
    validationSchema: editTopicSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateData("/countries/", values);
        } else {
          await createData("/countries/", { name: values.name });
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
            <Label htmlFor="password">Quốc gia :</Label>
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
            placeholder="Mời bạn nhập tên của chủ đề"
          />
          {formik.touched.name && formik.errors.name && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.name)}
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

export default CountryEditModalForm;
