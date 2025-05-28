/* eslint-disable @typescript-eslint/no-explicit-any */
import { DATA_COUNTRY, DATA_TRUE_FALSE } from "@/helpers/data_ex";
import clsx from "clsx";
import { Datepicker, Label, Select, TextInput } from "flowbite-react";
import type { FormikProps } from "formik";
import type { FC } from "react";

type MovieOtherDataProps = {
  formik: FormikProps<any>;
};
const MovieOtherData2: FC<MovieOtherDataProps> = ({ formik }) => {
  const handleChooseDate = (date: Date | undefined | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;
      formik.setFieldValue("release_date", formatted);
    } else {
      formik.setFieldValue("release_date", "");
    }
  };
  return (
    <>
      <div className="grid grid-cols-7 gap-4 my-3">
        {/* Ngày phát hành */}
        <div>
          <Label htmlFor="release_date">Ngày phát hành :</Label>
          <Datepicker
            value={
              formik.values.release_date instanceof Date
                ? formik.values.release_date
                : formik.values.release_date
                ? new Date(formik.values.release_date)
                : undefined
            }
            onChange={(date) => handleChooseDate(date)}
            className="mt-2"
          />
        </div>

        {/* Điểm imdb */}
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password">Điểm Imdb :</Label>
          </div>
          <TextInput
            id="imdb"
            type="number"
            autoComplete="current-imdb"
            {...formik.getFieldProps("imdb")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.imdb && formik.errors.imdb,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.imdb && !formik.errors.imdb,
              }
            )}
          />
          {formik.touched.imdb && formik.errors.imdb && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.imdb)}
            </span>
          )}
        </div>

        {/* Đánh giá */}
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password">Đánh giá :</Label>
          </div>
          <TextInput
            id="rating"
            type="number"
            autoComplete="current-rating"
            {...formik.getFieldProps("rating")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.rating && formik.errors.rating,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.rating && !formik.errors.rating,
              }
            )}
            disabled
            readOnly
          />
        </div>

        {/* Thời lượng */}
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password">Thời lượng :</Label>
          </div>
          <TextInput
            id="duration"
            type="text"
            autoComplete="current-duration"
            {...formik.getFieldProps("duration")}
            className={clsx(
              {
                "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                  formik.touched.duration && formik.errors.duration,
              },
              {
                "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                  formik.touched.duration && !formik.errors.duration,
              }
            )}
          />
          {formik.touched.duration && formik.errors.duration && (
            <span role="alert" className="text-red-500 text-sm mt-3">
              {String(formik.errors.duration)}
            </span>
          )}
        </div>

        {/* Ngôn ngữ */}
        <div>
          <Label htmlFor="birthday" className="mb-2 block">
            Ngôn ngữ :
          </Label>
          <Select
            id="language"
            {...formik.getFieldProps("language")}
            value={formik.values.language}
            onChange={formik.handleChange}
          >
            {DATA_COUNTRY.map((country) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Trang chủ */}
        <div>
          <Label htmlFor="" className="mb-2 block">
            Trang chủ :
          </Label>
          <Select
            id="is_banner"
            {...formik.getFieldProps("is_banner")}
            value={
              formik.values.is_banner !== undefined
                ? String(formik.values.is_banner)
                : ""
            }
            onChange={formik.handleChange}
          >
            {DATA_TRUE_FALSE.map((choose) => (
              <option key={choose.label} value={String(choose.value)}>
                {choose.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Ngôn ngữ */}
        <div>
          <Label htmlFor="" className="mb-2 block">
            Quảng cáo :
          </Label>
          <Select
            id="is_ads"
            {...formik.getFieldProps("is_ads")}
            value={
              formik.values.is_ads !== undefined
                ? String(formik.values.is_ads)
                : ""
            }
            onChange={formik.handleChange}
          >
            {DATA_TRUE_FALSE.map((choose) => (
              <option key={choose.label} value={String(choose.value)}>
                {choose.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

export default MovieOtherData2;
