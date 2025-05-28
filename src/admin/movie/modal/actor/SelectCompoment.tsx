/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, type FC } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Avatar, Label } from "flowbite-react";
import type { MultiValue, ActionMeta } from "react-select";
import type { OptionType } from "@/core/models";
import type { FormikProps } from "formik";

import { useDebounce } from "@/helpers/hook";
import CustomMenuList from "./CustomMenuList";
import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";

const animatedComponents = makeAnimated();

type MovieOtherDataProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
};

const SelectCompoment: FC<MovieOtherDataProps> = ({ formik }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [inputValue, setInputValue] = useState(""); // Lưu giá trị input
  const debouncedSearchTerm = useDebounce(inputValue, 200);

  useEffect(() => {
    fetchOptions(1);
    setPage(1);
  }, [debouncedSearchTerm]);

  const fetchOptions = async (numPage: number) => {
    const res = await getData(
      `actors/?page=${numPage}&search=${debouncedSearchTerm}`
    );
    console.log("res", res);

    const dataLabel = res?.results?.map((item: ActorItem) => ({
      value: String(item.id),
      label: (
        <div className="flex justify-start items-center" key={item.id}>
          <Avatar img={item.image} rounded>
            <div className="space-y-1 text-sm text-gray-800">
              <div>{item.name}</div>
            </div>
          </Avatar>
        </div>
      ),
    }));
    setOptions((prev) => (page === 1 ? dataLabel : [...prev, ...dataLabel]));
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleOnChangeData = (
    data: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    console.log("dataaaa", data);
    const result = data.map((item) => item.value);
    formik.setFieldValue("actor", result);
  };

  const getDataActor = () => {
    if (formik.values.id === 0) return [];
    console.log("options", options);

    if (options == undefined) return [];
    return options.filter((opt) =>
      formik.values.actor.some(
        (it: { id: number }) => String(it.id) === opt.value
      )
    );
  };

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    fetchOptions(nextPage).then(() => {
      setPage(nextPage);
      setIsLoadingMore(false);
    });
  }, [page, debouncedSearchTerm, isLoadingMore]);

  return (
    <>
      <Label htmlFor="" className="my-2 block">
        Diễn viên :
      </Label>
      <Select
        options={options}
        onInputChange={handleInputChange}
        components={{
          ...animatedComponents,
          MenuList: (props) => (
            <CustomMenuList {...props} onLoadMore={handleLoadMore} />
          ),
        }}
        onChange={handleOnChangeData}
        className="w-auto"
        isMulti
        defaultValue={getDataActor()}
      />
    </>
  );
};

export default SelectCompoment;
