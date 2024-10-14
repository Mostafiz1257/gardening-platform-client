// "use client";
// import { useState, useEffect } from "react"; // Import useEffect for initializing state
// import { Avatar, Button, Input } from "@nextui-org/react";
// import { toast } from "sonner"; // Import Sonner for notifications

// import { useUser } from "@/src/context/user.provider";
// import { useUpdateProfileMutation } from "@/src/redux/features/user";

// const Settings = () => {
//   const { user } = useUser();
//   const userId = user?._id; // Fixed variable name
//   const [updateProfile] = useUpdateProfileMutation();

//   // State to hold form data for user info (excluding profile image)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         address: user.address,
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUserUpdate = async () => {
//     if (!userId) {
//       toast.error("User ID is not available.");

//       return;
//     }

//     try {
//       const userData = { ...formData };

//       await updateProfile({ userId, userData }).unwrap(); // Use unwrap to handle
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Avatar size="lg" src={user?.profileImage} />{" "}
//       {/* Display current profile image but don't update */}
//       <Input
//         label="Name"
//         name="name"
//         type="text"
//         value={formData.name} // Set value from state
//         variant="underlined"
//         onChange={handleInputChange} // Handle input change
//       />
//       <Input
//         label="Email"
//         name="email"
//         type="email"
//         value={formData.email} // Set value from state
//         variant="underlined"
//         onChange={handleInputChange} // Handle input change
//       />
//       <Input
//         label="Phone"
//         name="phone"
//         type="text"
//         value={formData.phone} // Set value from state
//         variant="underlined"
//         onChange={handleInputChange} // Handle input change
//       />
//       <Input
//         label="Address"
//         name="address"
//         type="text"
//         value={formData.address} // Set value from state
//         variant="underlined"
//         onChange={handleInputChange} // Handle input change
//       />
//       <Button
//         className="mt-12 right-0"
//         color="primary"
//         size="sm"
//         variant="ghost"
//         onClick={handleUserUpdate} // Call update function on button click
//       >
//         Save changes
//       </Button>
//     </div>
//   );
// };

// export default Settings;

const page = () => {
  return (
    <div>
      <p>This is settings page</p>
    </div>
  );
};

export default page;
