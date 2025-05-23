import { getData } from "@/core/request";
import { isNotEmpty } from "@/helpers/functions";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import { useQuery } from "@tanstack/react-query";
import TopicEditModalForm from "./TopicEditModalForm";

const TopicWrapperModal = () => {
  const { itemIdTopicForUpdate } = useListProviderAdmin();
  const enabledQuery: boolean = isNotEmpty(itemIdTopicForUpdate);

  const { isPending, data } = useQuery({
    queryKey: [`TOPIC_MODAL_${itemIdTopicForUpdate}`],
    queryFn: () => getData(`topics/${itemIdTopicForUpdate}`),
    enabled: enabledQuery,
  });

  if (!itemIdTopicForUpdate) {
    return <TopicEditModalForm topic={{ id: 0, title: "" }} />;
  }

  if (!isPending && data) {
    return <TopicEditModalForm topic={data} />;
  }

  return null;
};

export default TopicWrapperModal;
