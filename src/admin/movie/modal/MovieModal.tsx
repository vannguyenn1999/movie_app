import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import MovieWrapperModal from "./MovieWrapperModal";

const MovieModal = () => {
  const { itemIdMovieForUpdate, setItemIdMovieForUpdate } =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdMovieForUpdate !== undefined}
      size="7xl"
      onClose={() => setItemIdMovieForUpdate(undefined)}
    >
      <ModalHeader>Phim</ModalHeader>
      <ModalBody>
        <MovieWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default MovieModal;
