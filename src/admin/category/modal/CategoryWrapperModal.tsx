import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { useQuery } from "@tanstack/react-query";
import CategoryEditModalForm from "./CategoryEditModalForm";

const CategoryWrapperModal = () => {
  const { itemIdCategoryForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdCategoryForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`CATEGORY_MODAL_${itemIdCategoryForUpdate}`],
    queryFn: () => getData(`categories/${itemIdCategoryForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdCategoryForUpdate) {
    return <CategoryEditModalForm category={{ id: 0, name: "" }} />;
  }

  if (!isPending && data) {
    return <CategoryEditModalForm category={data} />;
  }

  return null;
};

export default CategoryWrapperModal;
