/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { type FC, useMemo, lazy } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import makeAnimated from "react-select/animated";
import { Avatar, Label } from "flowbite-react";
import type { MultiValue, ActionMeta } from "react-select";
import type { FormikProps } from "formik";

import type { OptionType } from "@/core/models";
import type { ActorItem } from "@/helpers/models";
import { getData } from "@/core/request";

const LoadingCompoment = lazy(() => import("@/compoments/loading/Loading2"));

const animatedComponents = makeAnimated();

type MovieOtherDataProps = {
  formik: FormikProps<any>;
};

const ActorSelectCompoment: FC<MovieOtherDataProps> = ({ formik }) => {
  const { isPending, data } = useQuery({
    queryKey: [`ACTOR_SELECT`],
    queryFn: () => getData(`actors/?page=1&page_size=2000`),
  });

  const dataActorSelect = useMemo(() => {
    if (data && !isPending && Array.isArray(data.results)) {
      return (Array.isArray(data.results) ? data.results : []).map(
        (item: ActorItem) => {
          return {
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
            labelText: item.name,
          };
        }
      );
    }
  }, [data]);

  if (isPending) return <LoadingCompoment />;

  const handleOnChangeData = (
    newData: MultiValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    const result = newData.map((item) => item.value);
    formik.setFieldValue("actor", result);
    // console.log("data", data);
  };

  const getDataActor = () => {
    if (formik.values.id === 0) return [];

    return dataActorSelect.filter((opt: { value: string }) =>
      formik.values.actor.some(
        (it: { id: number }) => String(it.id) === opt.value
      )
    );
  };

  const customFilter = (option: any, rawInput: string) => {
    const input = rawInput.toLowerCase();
    return option.data.labelText.toLowerCase().includes(input);
  };

  return (
    <>
      <Label htmlFor="" className="block">
        Diễn viên :
      </Label>
      <Select
        options={dataActorSelect as OptionType[]}
        components={animatedComponents}
        onChange={handleOnChangeData}
        className="w-auto"
        filterOption={customFilter}
        isMulti
        defaultValue={getDataActor()}
        // getOptionLabel={(option) => option.labelText} // Dùng labelText để filter
        // getOptionValue={(option) => option.value}s

        // components={{
        //   ...animatedComponents,
        //   MenuList: (props) => (
        //     <CustomMenuList {...props} onLoadMore={handleLoadMore} />
        //   ),
        // }}
      />
    </>
  );
};

export default ActorSelectCompoment;
