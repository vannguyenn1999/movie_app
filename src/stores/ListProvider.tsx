/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type FC } from "react";

import type {
  CategoryItem,
  CountryItem,
  MovieItem,
  QueryRequestContext2,
  TopicItem,
  WithChildren,
} from "@/helpers/models";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/core/request";

const ListProviderContext = createContext<QueryRequestContext2>({
  isPendingTopic: true,
  dataTopic: [],

  isPendingCategory: true,
  dataCategory: [],

  isPendingCountry: true,
  dataCountry: [],

  isPendingHeader: true,
  dataHeader: [],
});

const ListProviderProvider: FC<WithChildren> = ({ children }) => {
  const { isPending: isPendingTopic, data: dataTopic } = useQuery<TopicItem>({
    queryKey: [`DATA_TOPIC`],
    queryFn: () => getData(`/topics/`),
  });

  const { isPending: isPendingCategory, data: dataCategory } =
    useQuery<CategoryItem>({
      queryKey: [`DATA_CATEGORY`],
      queryFn: () => getData(`/categories/`),
    });

  const { isPending: isPendingCountry, data: dataCountry } =
    useQuery<CountryItem>({
      queryKey: [`DATA_COUNTRY`],
      queryFn: () => getData(`/countries/`),
    });

  const { isPending: isPendingHeader, data: dataHeader } = useQuery<MovieItem>({
    queryKey: [`MOVIE_HEADERS`],
    queryFn: () => getData(`/movies/get-movies-header`),
  });

  if (
    isPendingCategory ||
    isPendingCountry ||
    isPendingTopic ||
    isPendingHeader
  ) {
    return <>Loading</>;
  }

  return (
    <ListProviderContext.Provider
      value={{
        isPendingTopic,
        dataTopic: dataTopic ?? [],

        isPendingCategory,
        dataCategory: dataCategory ?? [],

        isPendingCountry,
        dataCountry: dataCountry ?? [],

        isPendingHeader,
        dataHeader: dataHeader ?? [],
      }}
    >
      {children}
    </ListProviderContext.Provider>
  );
};

const useListProvider = () => useContext(ListProviderContext);

export { useListProvider, ListProviderProvider };
