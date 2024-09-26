"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "./_components/modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open the modal by default

  const closeModal = () => setIsModalOpen(false);
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} />

  );
}
