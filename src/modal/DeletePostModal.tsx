"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeletePostModal({
  isOpen,
  onClose,
  onDelete,
}: DeletePostModalProps) {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" size="sm" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" size="sm" onPress={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
