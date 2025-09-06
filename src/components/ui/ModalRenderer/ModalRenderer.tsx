"use client";
import { useModal } from "@/Context";
import { FileSelectionModal, PackagesModal } from "@/components/ui";
import ConfirmModal from "../Modals/ConfirmModal";

export default function ModalRenderer() {
  const { modal, closeModal } = useModal();

  if (!modal.type) return null;

  switch (modal.type) {
    case "CONFIRM":
      return <ConfirmModal {...modal.props} onClose={closeModal} />;
    case "FILE_SELECTION":
      return <FileSelectionModal {...modal.props} onClose={closeModal} />;
    case "PACKAGES":
      return <PackagesModal {...modal.props} onClose={closeModal} />;
    default:
      return null;
  }
}
