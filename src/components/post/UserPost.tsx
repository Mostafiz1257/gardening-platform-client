"use client"
import React from "react";
import PostCard from "./PostCard";

const UserPost = ({ posts, isLoading }) => {
  if (isLoading) return <p>Loading posts...</p>;

  return (
    <div>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserPost;
