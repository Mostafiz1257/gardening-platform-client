"use client";
import { useDeleteCommentMutation } from "@/src/redux/features/commentApi";
import { useGetAllUserQuery } from "@/src/redux/features/user";
import React from "react";
import { FiTrash2 } from "react-icons/fi"; // Importing delete icon from React Icons
import { toast } from "sonner";

const UserManage = () => {
  const { data, refetch } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteCommentMutation();
  const allUsers = data?.data || [];

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    refetch();
  };

  return (
    <div className='p-6 text-gray-400 b'>
      <h2 className='text-2xl font-semibold mb-4'>User Management</h2>
      <table className='min-w-full bg-gray-900 shadow-md rounded-lg overflow-hidden'>
        <thead className=''>
          <tr>
            <th className='py-2 px-4 text-left'>Image</th>
            <th className='py-2 px-4 text-left'>Name</th>
            <th className='py-2 px-4 text-left'>Email</th>
            <th className='py-2 px-4 text-left'>Role</th>
            <th className='py-2 px-4 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr key={user._id} className='border-b '>
              <td className='py-1 px-4'>
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className='w-12 h-12 rounded-full object-cover'
                />
              </td>
              <td className='py-2 px-4'>{user.name}</td>
              <td className='py-2 px-4'>{user.email}</td>
              <td className='py-2 px-4 capitalize'>{user.role}</td>
              <td className='py-2 px-4'>
                <button
                  onClick={() => handleDelete(user._id)}
                  className='text-red-600 hover:text-red-800'
                >
                  <FiTrash2 className='w-6 h-6' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
