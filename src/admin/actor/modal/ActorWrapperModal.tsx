import { useQuery } from "@tanstack/react-query";

import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import ActorEditModalForm from "./ActorEditModalForm";

const ActorWrapperModal = () => {
  const { itemIdActorForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdActorForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`ACTOR_MODAL_${itemIdActorForUpdate}`],
    queryFn: () => getData(`actors/${itemIdActorForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdActorForUpdate) {
    return <ActorEditModalForm actor={{ id: 0, name: "" }} />;
  }

  if (!isPending && data) {
    return <ActorEditModalForm actor={data} />;
  }

  return null;
};

export default ActorWrapperModal;
