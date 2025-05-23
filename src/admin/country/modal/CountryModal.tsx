import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import CountryWrapperModal from "./CountryWrapperModal";

const CountryModal = () => {
  const { setItemIdCountryForUpdate, itemIdCountryForUpdate } =
    useListProviderAdmin();

  return (
    <Modal
      show={itemIdCountryForUpdate !== undefined}
      onClose={() => setItemIdCountryForUpdate(undefined)}
    >
      <ModalHeader>Quốc gia</ModalHeader>
      <ModalBody>
        <CountryWrapperModal />
      </ModalBody>
    </Modal>
  );
};

export default CountryModal;
