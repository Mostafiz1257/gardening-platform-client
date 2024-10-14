"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { IPost } from "@/src/types";

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPost;
  onUpdate: (updatedPost: Partial<IPost>) => void;
}

export default function UpdatePostModal({
  isOpen,
  onClose,
  post,
  onUpdate,
}: UpdatePostModalProps) {
  // Keep a local state for the updated post details
  const [updatedPost, setUpdatedPost] = useState<Partial<IPost>>({
    title: post?.title,
    category: post?.category,
    content: post?.content,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedPost((prev) => ({ ...prev, [name]: value })); // Only update the local state, not triggering the update yet
  };

  const handleSubmit = () => {
    onUpdate(updatedPost); // Trigger the update when the "Update" button is clicked
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Post</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            name="title"
            placeholder="Enter the title"
            value={updatedPost.title}
            onChange={handleInputChange}
          />
          <Input
            label="Category"
            name="category"
            placeholder="Enter the category"
            value={updatedPost.category}
            onChange={handleInputChange}
          />
          <Input
            className="mt-4"
            label="Content"
            name="content"
            placeholder="Enter the content"
            value={updatedPost.content}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" size="sm" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" size="sm" onPress={handleSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
