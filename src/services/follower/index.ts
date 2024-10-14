import axios from "axios";

import { envConfig } from "@/src/config/envConfig";

interface FollowParams {
  userId: string;
  followUserId: string;
}

interface FollowResponse {
  success: boolean;
  message?: string;
}

export const makeFollow = async ({
  userId,
  followUserId,
}: FollowParams): Promise<FollowResponse> => {
  const res = await axios.post<FollowResponse>(
    `${envConfig.baseApi}/auth/follow`,
    {
      userId,
      followUserId,
    },
  );

  return res.data;
};

export const getFollowingUsers = async (userId: string) => {
  const res = await axios.get(`${envConfig.baseApi}/auth/users/following`, {
    params: { userId }, // Pass userId as query parameter
  });

  return res.data;
};
