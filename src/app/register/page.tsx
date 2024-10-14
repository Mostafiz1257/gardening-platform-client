"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { registerUser } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

const RegisterPage = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();

    formData.append("image", image);

    const response = await axios.post(IMAGE_UPLOAD_LINK, formData);

    if (response.data.success) {
      return response.data.data.url;
    }
    throw new Error("Image upload failed");
  };

  const handleRegister = async () => {
    try {
      let profileImageUrl = "";

      if (selectedImage) {
        profileImageUrl = await uploadImage(selectedImage);
      }

      const userData = {
        ...formData,
        profileImage: profileImageUrl || undefined,
        role: "user",
      };

      const response = await registerUser(userData);

      if (response.success) {
        setIsLoading(true);
        toast.success("Registration successful!");
        router.push("/dashboard");
        console.log("response", response);
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error("Error occurred during registration");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-5xl font-black text-center mb-8 font-title">
          Register Now!
        </h1>
        <Input
          label="Name"
          labelPlacement={"outside"}
          name="name"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Email"
          labelPlacement={"outside"}
          name="email"
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Password"
          labelPlacement={"outside"}
          name="password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          label="Image"
          labelPlacement={"outside"}
          name="profileImage"
          type="file"
          onChange={handleImageChange}
        />
        <Input
          label="Phone"
          labelPlacement={"outside"}
          name="phone"
          type="text"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          label="Address"
          labelPlacement={"outside"}
          name="address"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <Button
          className="w-full mt-6 rounded-xl"
          color="primary"
          size="sm"
          variant="ghost"
          onClick={handleRegister}
        >
          Register Now
        </Button>
        <div className="text-center">
          <p className="text-gray-700">
            Already have an account?
            <a
              className="text-blue-600 font-semibold hover:underline"
              href="/login"
            >
              Login now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
