import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import TopMovieWrapperModal from "./TopMovieWrapperModal";

const TopMovieModal = () => {
  const { setItemIdTopMovieForUpdate, itemIdTopMovieForUpdate } =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdTopMovieForUpdate !== undefined}
      onClose={() => setItemIdTopMovieForUpdate(undefined)}
    >
      <ModalHeader>Top phim</ModalHeader>
      <ModalBody>
        <TopMovieWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default TopMovieModal;
