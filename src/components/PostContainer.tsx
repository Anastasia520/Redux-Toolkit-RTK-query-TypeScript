import React from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../store/models/IPost";

export default function PostContainer() {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(200, { pollingInterval: 300000 });

  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleAddItem = async () => {
    const title = prompt();

    await createPost({ title: title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <button onClick={() => refetch()}>REFETCH</button>
      <button onClick={handleAddItem}>ADD ITEM</button>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {posts &&
        posts.map((post) => (
          <PostItem
            remove={handleRemove}
            update={handleUpdate}
            key={post.id}
            post={post}
          />
        ))}
    </div>
  );
}
