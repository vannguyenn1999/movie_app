import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import CategoryWrapperModal from "./CategoryWrapperModal";

const CategoryModal = () => {
  const { setItemIdCategoryForUpdate, itemIdCategoryForUpdate } =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdCategoryForUpdate !== undefined}
      onClose={() => setItemIdCategoryForUpdate(undefined)}
    >
      <ModalHeader>Thể loại</ModalHeader>
      <ModalBody>
        <CategoryWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default CategoryModal;
