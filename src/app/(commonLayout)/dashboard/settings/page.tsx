"use client";
import { useState, useEffect } from "react"; // Import useEffect for initializing state
import { useUser } from "@/src/context/user.provider";
import { useUpdateProfileMutation } from "@/src/redux/features/user";
import { Avatar, Button, Input } from "@nextui-org/react";
import { toast } from "sonner"; // Import Sonner for notifications

const Settings = () => {
  const { user } = useUser();
  const userId = user?._id; // Fixed variable name
  const [updateProfile] = useUpdateProfileMutation();
  
  // State to hold form data for user info (excluding profile image)
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
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }
    
    try {
      const userData = { ...formData };
      console.log("userData", userId, userData);
      await updateProfile({ userId, userData }).unwrap(); // Use unwrap to handle 
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <Avatar src={user?.profileImage} size="lg" /> {/* Display current profile image but don't update */}
      <Input
        type="text"
        name="name"
        variant="underlined"
        label="Name"
        value={formData.name} // Set value from state
        onChange={handleInputChange} // Handle input change
      />
      <Input
        type="email"
        name="email"
        variant="underlined"
        label="Email"
        value={formData.email} // Set value from state
        onChange={handleInputChange} // Handle input change
      />
      <Input
        type="text"
        name="phone"
        variant="underlined"
        label="Phone"
        value={formData.phone} // Set value from state
        onChange={handleInputChange} // Handle input change
      />
      <Input
        type="text"
        name="address"
        variant="underlined"
        label="Address"
        value={formData.address} // Set value from state
        onChange={handleInputChange} // Handle input change
      />
      <Button
        color="primary"
        className="mt-12 right-0"
        size="sm"
        variant="ghost"
        onClick={handleUserUpdate} // Call update function on button click
      >
        Save changes
      </Button>
    </div>
  );
};

export default Settings;
