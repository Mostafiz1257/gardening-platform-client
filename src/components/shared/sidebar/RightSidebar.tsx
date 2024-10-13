"use client";

import { toast } from "sonner";
import Footer from "../Footer/Footer";
import { useGetUser } from "@/src/hooks/auth.hooks";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/features/user";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { IUser } from "@/src/types";

const RightSidebar = () => {
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
      <div className='hidden md:block md:mx-8 md:w-1/4'>
        <div className='text-gray-600 pt-3'>
          <p>Follow them for relevant post</p>
          <Divider className='mt-3' />
        </div>
        <div className='w-full'>
          {users?.slice(0, 5).map((user: IUser) => {
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
                        <Button
                          color='primary'
                          radius='full'
                          size='sm'
                          variant='shadow'
                          onClick={() => handleFollowUser(user._id)}
                          className='h-[30px] md:px-5'
                        >
                          {newData?.data?.following?.some(
                            (follower: any) => follower === user._id
                          )
                            ? "Following"
                            : "Follow"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
