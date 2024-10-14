"use client";
import React from "react";

import PostCard from "./PostCard";

import { IPost } from "@/src/types";

// eslint-disable-next-line prettier/prettier
const UserPost = ({ posts, isLoading }:any) => {
  if (isLoading) return <p>Loading posts...</p>;

  return (
    <div>
      {posts?.length > 0 ? (
        // eslint-disable-next-line prettier/prettier
        posts.map((post:IPost) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserPost;
