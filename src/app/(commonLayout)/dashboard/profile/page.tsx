"use client";

import MyPostCard from "@/src/components/post/MyPostCard";
import { useUser } from "@/src/context/user.provider";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { IPost } from "@/src/types";

import { useGetMyPostsQuery } from "@/src/redux/features/post";
import { useGetUser } from "@/src/hooks/auth.hooks";
import { useState } from "react";
import UpdateProfileModal from "@/src/modal/UpdateProfileModal";


const Profile = () => {
  const { data: user } = useGetUser();
  const id = user?.data?._id;

  const { data } = useGetMyPostsQuery(id, {
    skip: !id,
  });

  const posts = data?.data;
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  return (
    <div>
      <div className='md:flex justify-center items-center gap-6'>
        <Avatar
          src={user?.data?.profileImage}
          className='md:w-24 md:h-24 rounded-full shadow-lg'
        />
        <div className='ml-6 text-center md:text-left'>
          <h1 className='text-2xl font-bold text-gray-800'>
            {user?.data.name}
          </h1>
          <p className='text-gray-500'>{user?.data.email}</p>
        </div>
      </div>
      <div className='flex justify-end mr-3'>
        <Button
          className=' text-white rounded-full'
          color='primary'
          radius='full'
          size='sm'
          variant='shadow'
          onClick={() => setModalOpen(true)} // Open modal on button click
        >
          Edit Profile
        </Button>
      </div>
      <Divider className='my-4 border-t-2 border-gray-300' />
      <div>
        {posts?.map((singlePost: IPost) => (
          <MyPostCard key={singlePost._id} singlePost={singlePost} />
        ))}
      </div>
      
      {/* Include the UpdateProfileModal here */}
      <UpdateProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        user={user?.data} 
      />
    </div>
  );
};

export default Profile;
