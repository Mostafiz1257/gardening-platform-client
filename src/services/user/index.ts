//update user info

import axios from "axios";

import { envConfig } from "@/src/config/envConfig";
import { IUser } from "@/src/types";

export const getAllUser = async () => {
  const res = await axios.get(`${envConfig.baseApi}/auth/all-users`);

  return res.data.data;
};

export const updateUserInfo = async (
  id: string,
  updateData: Partial<IUser>,
) => {
  const res = await axios.patch(`${envConfig.baseApi}/auth/${id}`, updateData);

  return res.data;
};
