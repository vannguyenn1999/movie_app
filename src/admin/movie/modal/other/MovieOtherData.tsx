/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC } from "react";
import Select, {
  type ActionMeta,
  type MultiValue,
  type SingleValue,
} from "react-select";
import { Label } from "flowbite-react";
import type { FormikProps } from "formik";

import type { CategoryItem, CountryItem, TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import type { OptionType } from "@/core/models";

type MovieOtherDataProps = {
  formik: FormikProps<any>;
};

const MovieOtherData: FC<MovieOtherDataProps> = ({ formik }) => {
  const { dataCategory, dataTopic, dataCountry } = useListProvider();

  const dataCategorySelect = useMemo(() => {
    return (Array.isArray(dataCategory) ? dataCategory : []).map(
      (item: CategoryItem) => {
        return {
          value: String(item.id),
          label: item.name,
          labelText: item.name, // Add labelText
        };
      }
    );
  }, [dataCategory]);

  const dataTopicSelect = useMemo(() => {
    return (Array.isArray(dataTopic) ? dataTopic : []).map(
      (item: TopicItem) => {
        return {
          value: String(item.id),
          label: item.title,
          labelText: item.title, // Add labelText
        };
      }
    );
  }, [dataTopic]);

  const dataCountrySelect = useMemo(() => {
    return (Array.isArray(dataCountry) ? dataCountry : []).map(
      (item: CountryItem) => {
        return {
          value: String(item.id),
          label: item.name,
          labelText: item.name, // Add labelText
        };
      }
    );
  }, [dataCountry]);

  const getData = (type: "topic" | "category" | "country") => {
    if (formik.values.id === 0) return [];

    if (type === "topic" || type === "category") {
      const formikArr = Array.isArray(formik.values[type])
        ? formik.values[type]
        : [];
      const selectArr = type === "topic" ? dataTopicSelect : dataCategorySelect;
      return selectArr.filter((opt) =>
        formikArr.some((it: { id: number }) => String(it.id) === opt.value)
      );
    }

    if (type === "country") {
      return dataCountrySelect.filter(
        (country) => country.value === String(formik.values.country?.id)
      );
    }

    return [];
  };

  const handleSelectChange = (
    data: MultiValue<OptionType> | SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    const { name } = actionMeta;
    if (name === "topic" || name === "category") {
      const result = (data as MultiValue<OptionType>).map((item) =>
        Number(item.value)
      );
      formik.setFieldValue(name, result);
    }
    if (name === "country") {
      formik.setFieldValue("country", Number((data as OptionType)?.value));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="" className="mb-2 block">
          Chủ đề :
        </Label>
        <Select
          name="topic"
          options={dataTopicSelect}
          className="w-auto bg-transition"
          isMulti
          defaultValue={getData("topic")}
          onChange={handleSelectChange}
        />
      </div>

      <div>
        <Label htmlFor="" className="mb-2 block">
          Thể loại :
        </Label>
        <Select
          options={dataCategorySelect}
          className="w-auto bg-transition"
          isMulti
          defaultValue={getData("category")}
          onChange={handleSelectChange}
          name="category"
        />
      </div>

      <div>
        <Label htmlFor="" className="mb-2 block">
          Quốc gia :
        </Label>
        <Select
          options={dataCountrySelect}
          className="w-auto bg-transition"
          defaultValue={getData("country")}
          onChange={handleSelectChange}
          name="country"
        />
      </div>
    </div>
  );
};

export default MovieOtherData;
