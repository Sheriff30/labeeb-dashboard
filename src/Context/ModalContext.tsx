/* eslint-disable @typescript-eslint/no-explicit-any */
// context/ModalContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "SUCCESS" | null;

interface ModalState {
  type: ModalType;
  props?: any;
}

interface ModalContextProps {
  modal: ModalState;
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalType, props?: any) => setModal({ type, props });
  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
