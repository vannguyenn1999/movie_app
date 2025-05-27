import { useMemo, type FC } from "react";
import Select from "react-select";
import { Label } from "flowbite-react";

import type { CategoryItem, CountryItem, TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";

type MovieOtherDataProps = {
  category: CategoryItem | [];
  topic: TopicItem | [];
  country: CountryItem | [];
};

const MovieOtherData: FC<MovieOtherDataProps> = ({
  category,
  topic,
  country,
}) => {
  const { dataCategory, dataTopic, dataCountry } = useListProvider();

  const dataCategorySelect = useMemo(() => {
    return (Array.isArray(dataCategory) ? dataCategory : []).map(
      (item: CategoryItem) => {
        return {
          value: item.id,
          label: item.name,
        };
      }
    );
  }, [dataCategory]);

  const dataTopicSelect = useMemo(() => {
    return (Array.isArray(dataTopic) ? dataTopic : []).map(
      (item: TopicItem) => {
        return {
          value: item.id,
          label: item.title,
        };
      }
    );
  }, [dataTopic]);

  const dataCountrySelect = useMemo(() => {
    return (Array.isArray(dataCountry) ? dataCountry : []).map(
      (item: CountryItem) => {
        return {
          value: item.id,
          label: item.name,
        };
      }
    );
  }, [dataCountry]);

  const getData = (type: string) => {
    switch (type) {
      case "topic":
        return [dataTopicSelect[1], dataTopicSelect[2], dataTopicSelect[3]];
      case "category":
        return [dataCategorySelect[1], dataCategorySelect[2]];
      case "country":
        return [dataCountrySelect[1]];

      default:
        return [];
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="" className="mb-2 block">
          Chủ đề :
        </Label>
        <Select
          options={dataTopicSelect}
          className="w-auto bg-transition"
          isMulti
          defaultValue={getData("topic")}
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
        />
      </div>
    </div>
  );
};

export default MovieOtherData;
