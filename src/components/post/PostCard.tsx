import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import { GiSelfLove } from "react-icons/gi";
import { useUser } from "@/src/context/user.provider";
import { MdVerified } from "react-icons/md";
import { FaShare, FaComment, FaBookmark } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import {
  useCreateDislikeMutation,
  useCreateLikeMutation,
  useMakeFavoriteMutation,
} from "@/src/redux/features/post";
import { toast } from "sonner";
import { useGetUser } from "@/src/hooks/auth.hooks";
import { useFollowUserMutation } from "@/src/redux/features/user";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/commentApi";
import Link from "next/link";

const PostCard = ({ post }) => {
  // console.log("post",post);
  const { user } = useUser();
  const { data: newData, refetch: refetchUserData } = useGetUser();
  const userId = newData?.data?._id;
  const [createLike] = useCreateLikeMutation();
  const [createDislike] = useCreateDislikeMutation();
  const [followUser] = useFollowUserMutation();
const [makeFavorite] = useMakeFavoriteMutation()

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Local state for managing comments
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Local state to track like/dislike status and counts
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);
  const [dislikes, setDislikes] = useState(post?.dislikes || []);

  // Effect to set the initial status based on post data
  useEffect(() => {
    if (post?.likes?.some((like) => like?.user?._id === userId)) {
      setIsLiked(true);
    }
    if (post?.dislikes?.some((dislike) => dislike?.user?._id === userId)) {
      setIsDisliked(true);
    }
  }, [post, userId]);


  const handleSavePost = async (post: any) => {
    try {
     
      // Create the saveData object with post and user ID
      const saveData = { post, user: userId };
      const res = await makeFavorite({ saveData }).unwrap(); // Pass saveData to savePost
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

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

  const handleLikePost = async (postId: string) => {
    try {
      const likeObject = { userId, postId };

      // If the post is already liked, unlike it
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes.filter((like) => like?.user?._id !== userId));
        toast.success("You unliked it");
      } else {
        // Like the post
        const res = await createLike(likeObject).unwrap();
        setIsLiked(true);
        setIsDisliked(false); // Remove dislike if it was set
        setLikes([...likes, { user: { _id: userId } }]);

        // If it was previously disliked, remove that dislike
        if (isDisliked) {
          setDislikes(
            dislikes.filter((dislike) => dislike?.user?._id !== userId)
          );
        }

        toast.success("You liked it");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error", error);
    }
  };

  const handleDislikePost = async (postId: string) => {
    try {
      const dislikeObject = { userId, postId };

      // If the post is already disliked, remove dislike
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(
          dislikes.filter((dislike) => dislike?.user?._id !== userId)
        );
        toast.success("You undisliked it");
      } else {
        // Dislike the post
        const res = await createDislike(dislikeObject).unwrap();
        setIsDisliked(true);
        setIsLiked(false); // Remove like if it was set
        setDislikes([...dislikes, { user: { _id: userId } }]);

        // If it was previously liked, remove that like
        if (isLiked) {
          setLikes(likes.filter((like) => like?.user?._id !== userId));
        }

        toast.success("You disliked it");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log("Error disliking the post:", error.message || error);
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      const commentObject = { author: userId, commentText };

      // ;      console.log("obj", commentObject);
      const newComment = await createComment({
        commentObject,
        postId,
      }).unwrap();
      console.log("new commensts", newComment);
      setComments([...comments, newComment]);

      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
      console.error("Error adding comment:", error);
    }
  };



  const handleUpdateComment = async (commentId: string) => {
    if (!editingText.trim()) return;

    try {
      const updateObject = {
        author: userId,
        commentId,
        commentText: editingText,
      };
      const updatedComment = await updateComment(updateObject).unwrap();
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null); // Exit editing mode
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ authorId: userId, commentId }).unwrap();
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Card className='w-full my-4'>
      <CardHeader className='justify-between'>
        <div className='flex gap-3'>
          <Avatar
            isBordered
            radius='full'
            size='md'
            src={post?.userId?.profileImage}
          />
          <div className='flex flex-col gap-1 items-start justify-center'>
            <div className='flex'>
              
              <Link href={`/dashboard/user/${post?.userId._id}`} className='text-small font-semibold leading-none text-default-600'>
                {post?.userId?.name}
              </Link >
              <span className='ml-3'>
                {post?.userId?.isPremium === false && (
                  <MdVerified className='text-blue-700 ' />
                )}
              </span>
            </div>
            <h5 className='text-small tracking-tight text-default-400'>
              {post?.userId?.email}
            </h5>
          </div>
        </div>
        <Button
          color='primary'
          radius='full'
          size='sm'
          variant='shadow'
          onClick={() => handleFollowUser(post?.userId?._id)}
          className='h-[30px] md:px-5'
        >
          {newData?.data?.following?.some(
            (follower: any) => follower === post?.userId?._id
          )
            ? "Following"
            : "Follow"}
        </Button>
      </CardHeader>

      <CardBody className='px-2 py-0 text-small text-default-400'>
        {post?.image.length > 0 && (
          <div>
            <Image
              removeWrapper
              alt='Card background'
              className='z-0 w-full h-[300px] object-cover'
              src={post?.image[0]} // Assuming the first image
            />
          </div>
        )}
        <p className='font-bold pt-2 text-blue-700'>#{post?.category}</p>
        <p className='py-2 font-medium'>{post?.content}</p>
      </CardBody>

      {/* Display comments directly after the post content */}
      <div className='comments-section px-2 py-2 border-t border-gray-800'>
        <p className='text-sm'>Comments:</p>
        {post?.comments.length > 0 ? (
         post?.comments?.map((comment) => (
            <div key={comment?._id} className='text-gray-400 rounded '>
              <div className='flex justify-between text-sm my-1'>
                <div className='flex justify-center items-center gap-3 my-1'>
                  <Avatar
                    isBordered
                    radius='full'
                    size='sm'
                    className='h-[20px] w-[20px]'
                    src={comment?.author?.profileImage}
                  />
                  <span>{comment?.commentText || "Anonymous"}</span>
                </div>
                <div className='flex gap-2'>
                  {userId === comment?.author?._id && (
                    <>
                      <Button
                        size='sm'
                        variant='flat'
                        className='h-[20px] rounded-full '
                        onClick={() => setEditingCommentId(comment?._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        className='h-[20px] rounded-full'
                        onClick={() => handleDeleteComment(comment?._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {editingCommentId === comment?._id ? (
                <div className='flex flex-col gap-2'>
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder='Edit comment...'
                  />
                  <Button
                    size='sm'
                    onClick={() => handleUpdateComment(comment?._id)}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <p>{comment?.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className='text-gray-600'>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Comment input box */}
      <CardFooter className='flex items-center justify-between '>
        <Input
          placeholder='Write a comment...'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className='w-3/4  flex justify-center rounded-full '
        />
        <Button
          size='sm'
          color='primary'
          onClick={() => handleCreateComment(post?._id)}
          className='ml-2 rounded-full text-white'
        >
          Post
        </Button>
      </CardFooter>

      <CardFooter className='flex justify-between border-t border-gray-700'>
        <div className='flex gap-4'>
          <button
            onClick={() => handleLikePost(post?._id)}
            className='text-large text-default-500'
          >
            {isLiked ? <BiSolidLike /> : <SlLike />} {likes?.length}
          </button>
          <button
            onClick={() => handleDislikePost(post?._id)}
            className='text-large text-default-500'
          >
            {isDisliked ? <BiSolidDislike /> : <SlDislike />} {dislikes?.length}
          </button>
          <button className='text-large text-default-500'>
            <FaComment />
            {post?.comments?.length}
          </button>
        </div>
        <div className='flex'>
          <button className='text-large text-default-500'>
          <div 
           onClick={() => handleSavePost(post?._id)}
          className="flex items-center">
            <GiSelfLove className="text-2xl" /> 
          </div>
          </button>
          <button className='ml-3 text-large text-default-500'>
            <FaShare />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
