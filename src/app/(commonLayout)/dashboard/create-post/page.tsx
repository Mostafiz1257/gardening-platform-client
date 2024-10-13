"use client"
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { createPost } from "@/src/services/post";
import { useUser } from "@/src/context/user.provider";

interface FormDataType {
  title: string;
  category: string;
  content: string;
}

const CreatePost: React.FC = () => {
  const {user} = useUser()
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    category: "",
    content: "",
  });

  const [images, setImages] = useState<File[]>([]); // To store selected images
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // To store 

  const userId =user?._id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file input (multiple)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files)); 
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Upload each image to ImgBB and get the URLs
      const uploadPromises = images.map((image) => {
        const imageData = new FormData();
        imageData.append("image", image);

        const url =
          "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

        return axios.post(url, imageData);
      });

      // Wait for all images to be uploaded
      const uploadResponses = await Promise.all(uploadPromises);
      const imageLinks = uploadResponses.map((res) => res.data.data.url);

      // Set the uploaded image URLs to state
      setUploadedImages(imageLinks);

      // Structure the final data object
      const finalData = {
        title: formData.title,
        content: formData.content,
        category:formData.category,
        image: imageLinks,
        userId:userId 
      };

  
      createPost(finalData);


    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <Input
        type="text"
        name="title"
        variant="underlined"
        label="title"
        placeholder="Give a Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="category"
        variant="underlined"
        label="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="content"
        variant="underlined"
        label="content"
        placeholder="Write about your post"
        value={formData.content}
        onChange={handleInputChange}
      />

      {/* Multiple Image upload field */}
      <Input
        type="file"
        accept="image/*"
        variant="underlined"
        label="Upload Images"
        multiple
        onChange={handleImageChange}
      />

      <Button
        color="primary"
        className="mt-12 right-0"
        size="sm"
        variant="ghost"
        onClick={handleSubmit}
      >
        Upload Now
      </Button>
    </div>
  );
};

export default CreatePost;
