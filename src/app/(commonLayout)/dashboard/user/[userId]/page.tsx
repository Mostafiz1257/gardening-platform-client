"use client"
import PostCard from "@/src/components/post/PostCard";
import { useGetMyPostsQuery } from "@/src/redux/features/post";


const SingleUserPost
 = ({params}) => {
const id = params.userId;
const {data} = useGetMyPostsQuery(id)
const posts = data?.data
console.log("singleData", posts);
    return (
        <div>
            {posts?.map((post) => (
        <PostCard key={post._id} post={post}  /> 
      ))}
        </div>
    );
};

export default SingleUserPost
;