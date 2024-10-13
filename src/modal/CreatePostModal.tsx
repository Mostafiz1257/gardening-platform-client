import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";
// import { createPost } from "@/src/services/post";
import { useUser } from "@/src/context/user.provider";
import { useCreatePostMutation } from "../redux/features/post";
import { toast } from "sonner";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataType {
  title: string;
  category: string;
  content: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [createPost] = useCreatePostMutation()
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    category: "",
    content: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
    }
  };

  const handleSubmit = async () => {
    try {
      // Upload images and create post logic
      const uploadPromises = images.map((image) => {
        const imageData = new FormData();
        imageData.append("image", image);

        const url =
          "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";
        return axios.post(url, imageData);
      });

      const uploadResponses = await Promise.all(uploadPromises);
      const imageLinks = uploadResponses.map((res) => res.data.data.url);

      const finalData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: imageLinks,
        userId: user?._id,
      };

    //   await createPost(finalData);
      const res = await createPost(finalData).unwrap();
      if(res.success){
          onClose(); 
          toast.success("post uploaded");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Create a Post</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="title"
                label="Title"
                placeholder="Give a title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="category"
                label="Category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="content"
                label="Content"
                placeholder="Write about your post"
                value={formData.content}
                onChange={handleInputChange}
              />
              <Input
                type="file"
                accept="image/*"
                label="Upload Images"
                multiple
                onChange={handleImageChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button className="rounded-full" onClick={onClose} size="sm" color="danger">
                Cancel
              </Button>
              <Button className="rounded-full" onClick={handleSubmit} size="sm" color="primary">
                Upload Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
