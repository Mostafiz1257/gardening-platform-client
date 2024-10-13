"use client";

import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useUpdateProfileMutation } from "@/src/redux/features/user";
import { toast } from "sonner";
import { useGetUser } from "../hooks/auth.hooks";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; 
}

const UpdateProfileModal = ({ isOpen, onClose, user }: UpdateProfileModalProps) => {
  const [updateProfile,] = useUpdateProfileMutation();
  const {refetch} = useGetUser()
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUserUpdate = async () => {
    const userId = user?._id;

    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    try {
      const userData = { ...formData };
      await updateProfile({ userId, userData }).unwrap();
      toast.success("Profile updated successfully!");
      onClose(); 
      await refetch()
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Profile</ModalHeader>
        <ModalBody>
          <Input
            name="name"
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-4"
          />
          <Input
            name="address"
            label="Address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-4"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" size="sm" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" size="sm" onPress={handleUserUpdate}>
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
