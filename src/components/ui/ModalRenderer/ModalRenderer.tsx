"use client";
import { useModal } from "@/Context";
import { SuccessModal } from "@/components/ui";
import { FileSelectionModal } from "../Modals/FileSelectionModal";

export default function ModalRenderer() {
  const { modal, closeModal } = useModal();

  if (!modal.type) return null;

  switch (modal.type) {
    case "SUCCESS":
      return <SuccessModal {...modal.props} onClose={closeModal} />;
    case "FILE_SELECTION":
      return <FileSelectionModal {...modal.props} onClose={closeModal} />;

    default:
      return null;
  }
}
