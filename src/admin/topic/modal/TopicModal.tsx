import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import TopicWrapperModal from "./TopicWrapperModal";

const TopicModal = () => {
  const { setItemIdTopicForUpdate, itemIdTopicForUpdate } =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdTopicForUpdate !== undefined}
      onClose={() => setItemIdTopicForUpdate(undefined)}
    >
      <ModalHeader>Chủ đề</ModalHeader>
      <ModalBody>
        <TopicWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default TopicModal;
