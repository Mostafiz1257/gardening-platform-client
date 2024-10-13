"use client"
import MyPostCard from "@/src/components/post/MyPostCard";
import { useGetAllPostQuery } from "@/src/redux/features/post";
import { Divider } from "@nextui-org/react";
import React from "react";

const PostManagement = () => {

    const {data} = useGetAllPostQuery({})
    const posts = data?.data
  return (
    <div>
    <h1 className="text-gray-700 font-bold">All Post Only for Admin</h1>
    <Divider></Divider>
   <div>
   {posts?.map((singlePost: IPost) => (
        <MyPostCard key={singlePost._id} singlePost={singlePost} />
      ))}
   </div>
  </div>
  );
};

export default PostManagement;
