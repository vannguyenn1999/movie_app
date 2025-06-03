/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC } from "react";

import type { ID, ListViewContextProps, WithChildren } from "@/helpers/models";

const ListProviderContextAdmin = createContext<ListViewContextProps>({
  itemIdMovieForUpdate: undefined,
  setItemIdMovieForUpdate: () => {},

  itemIdCategoryForUpdate: undefined,
  setItemIdCategoryForUpdate: () => {},

  itemIdTopicForUpdate: undefined,
  setItemIdTopicForUpdate: () => {},

  itemIdCountryForUpdate: undefined,
  setItemIdCountryForUpdate: () => {},

  itemIdActorForUpdate: undefined,
  setItemIdActorForUpdate: () => {},

  itemIdTopMovieForUpdate: undefined,
  setItemIdTopMovieForUpdate: () => {},
});

const ListProviderProviderAdmin: FC<WithChildren> = ({ children }) => {
  const [itemIdMovieForUpdate, setItemIdMovieForUpdate] =
    useState<ID>(undefined);
  const [itemIdCategoryForUpdate, setItemIdCategoryForUpdate] =
    useState<ID>(undefined);
  const [itemIdTopicForUpdate, setItemIdTopicForUpdate] =
    useState<ID>(undefined);
  const [itemIdCountryForUpdate, setItemIdCountryForUpdate] =
    useState<ID>(undefined);
  const [itemIdActorForUpdate, setItemIdActorForUpdate] =
    useState<ID>(undefined);
  const [itemIdTopMovieForUpdate, setItemIdTopMovieForUpdate] =
    useState<ID>(undefined);

  return (
    <ListProviderContextAdmin.Provider
      value={{
        itemIdMovieForUpdate,
        setItemIdMovieForUpdate,
        itemIdCategoryForUpdate,
        setItemIdCategoryForUpdate,
        itemIdTopicForUpdate,
        setItemIdTopicForUpdate,
        itemIdCountryForUpdate,
        setItemIdCountryForUpdate,
        itemIdActorForUpdate,
        setItemIdActorForUpdate,
        itemIdTopMovieForUpdate,
        setItemIdTopMovieForUpdate,
      }}
    >
      {children}
    </ListProviderContextAdmin.Provider>
  );
};

const useListProviderAdmin = () => useContext(ListProviderContextAdmin);

export { useListProviderAdmin, ListProviderProviderAdmin };
