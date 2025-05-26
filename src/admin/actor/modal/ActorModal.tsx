import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import ActorWrapperModal from "./ActorWrapperModal";

const ActorModal = () => {
  const { itemIdActorForUpdate , setItemIdActorForUpdate} =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdActorForUpdate !== undefined}
      onClose={() => setItemIdActorForUpdate(undefined)}
    >
      <ModalHeader>Diễn viên</ModalHeader>
      <ModalBody>
        <ActorWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default ActorModal;
