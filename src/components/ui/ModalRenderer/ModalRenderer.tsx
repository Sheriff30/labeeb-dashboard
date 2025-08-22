"use client";
import { useModal } from "@/Context";
import { SuccessModal } from "@/components/ui";

export default function ModalRenderer() {
  const { modal, closeModal } = useModal();

  if (!modal.type) return null;

  switch (modal.type) {
    case "SUCCESS":
      return <SuccessModal {...modal.props} onClose={closeModal} />;
    default:
      return null;
  }
}
