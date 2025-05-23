/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC } from "react";

import type { ID, ListViewContextProps, WithChildren } from "@/helpers/models";

const ListProviderContextAdmin = createContext<ListViewContextProps>({
  selected: [],
  itemIdForUpdate: undefined,
  setItemIdForUpdate: () => {},
});

const ListProviderProviderAdmin: FC<WithChildren> = ({ children }) => {
  const [selected, setSelected] = useState<Array<ID>>([]);
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(undefined);
  return (
    <ListProviderContextAdmin.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
      }}
    >
      {children}
    </ListProviderContextAdmin.Provider>
  );
};

const useListProviderAdmin = () => useContext(ListProviderContextAdmin);

export { useListProviderAdmin, ListProviderProviderAdmin };
