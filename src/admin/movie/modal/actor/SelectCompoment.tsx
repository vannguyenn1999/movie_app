/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Avatar, Label } from "flowbite-react";
import type { MultiValue, ActionMeta } from "react-select";

import { useDebounce } from "@/helpers/hook";
import CustomMenuList from "./CustomMenuList";
import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";

type OptionType = { label: string; value: string };
const animatedComponents = makeAnimated();

const SelectCompoment = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [inputValue, setInputValue] = useState(""); // Lưu giá trị input
  const debouncedSearchTerm = useDebounce(inputValue, 200);

  useEffect(() => {
    fetchOptions(1);
    setPage(1);
  }, [debouncedSearchTerm]);

  const fetchOptions = async (pageNumber: number) => {
    const res = await getData(
      `actors/?page=${pageNumber}&search=${debouncedSearchTerm}`
    );
    console.log("res", res);

    const dataLabel = res.results.map((item: ActorItem) => ({
      value: item.id,
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
    setOptions((prev) =>
      pageNumber === 1 ? dataLabel : [...prev, ...dataLabel]
    );
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleOnChangeData = (
    data: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    console.log("dataaaa", data);
  };

  const handleLoadMore = useCallback(() => {
    console.log("isLoadingMore", isLoadingMore);

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
      />
    </>
  );
};

export default SelectCompoment;
