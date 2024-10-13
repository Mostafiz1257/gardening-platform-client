"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetUser } from "@/src/hooks/auth.hooks";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/features/user";
import { IUser } from "@/src/types";
import { Avatar, Button } from "@nextui-org/react";
import { toast } from "sonner";

const Friend = () => {

  const { data: newData, refetch: refetchUserData } = useGetUser(); 
  const userId = newData?.data?._id;
  const { data } = useGetAllUserQuery({}); 
  const [followUser] = useFollowUserMutation();
  const users = data?.data;

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userId, followeeId };
      const res = await followUser({ followInfo }).unwrap();
  await refetchUserData();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {users?.map((user: IUser) => {
          return (
            <div
              key={user._id}
              className='border border-gray-900 rounded-xl p-2 my-3'
            >
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <div>
                    <Avatar
                      isBordered
                      radius='full'
                      size='md'
                      src={user.profileImage}
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-start justify-center'>
                    <h4 className='text-small font-semibold leading-none text-default-600'>
                      {user.name}
                    </h4>
                    <h5 className='text-small tracking-tight text-default-400'>
                      {user.email}
                    </h5>
                  </div>
                </div>
                <div>
                  <div>
                    {user?._id !== userId && (
                      <div
                        onClick={() => handleFollowUser(user._id)}
                        className='text-blue-500 ms-2 cursor-pointer'
                      >
                        {newData?.data?.following?.some(
                          (follower: any) => follower === user._id
                        )
                          ? "Following"
                          : "Follow"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Friend;
