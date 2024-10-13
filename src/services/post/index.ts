import { envConfig } from "@/src/config/envConfig";
import { IPost } from "@/src/types";
import axios from "axios";


//create a post
export const createPost = async (data) => {
  const res = await axios.post(`${envConfig.baseApi}/post`, data);
  return res.data;
};

//get all post
export const getPosts = async () => {
  const res = await fetch(`${envConfig.baseApi}/post`, { cache: "no-store" });
  return res.json();
};

//edit my psot
export const updatePost = async (id: string, updateData: Partial<IPost>) => {
  const res = await axios.patch(`${envConfig.baseApi}/post/${id}`, updateData, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  return res.data;
};

//deletePost
export const deletePost = async (id: string) => {
  const res = await axios.delete(`${envConfig.baseApi}/post/${id}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  return res.data;
};

export const addLike = async (userId:string,postId:string) => {
  const res = await axios.post(
    `${envConfig.baseApi}/likes`,
    {
      userId,postId
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  return res.data;
};


export const disLike = async (userId: string, postId: string) => {
  const res = await axios.post(
    `${envConfig.baseApi}/dislikes`,
    {
      userId,
      postId,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  return res.data;
};
