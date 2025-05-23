import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { useQuery } from "@tanstack/react-query";
import CountryEditModalForm from "./CountryEditModalForm";

const CountryWrapperModal = () => {
  const { itemIdCountryForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdCountryForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`COUNTRY_MODAL_${itemIdCountryForUpdate}`],
    queryFn: () => getData(`countries/${itemIdCountryForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdCountryForUpdate) {
    return <CountryEditModalForm country={{ id: 0, name: "" }} />;
  }

  if (!isPending && data) {
    return <CountryEditModalForm country={data} />;
  }

  return null;
};

export default CountryWrapperModal;
