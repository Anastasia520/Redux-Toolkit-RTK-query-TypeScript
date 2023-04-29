import React, { FC } from "react";
import { IPost } from "../store/models/IPost";

interface IPostItem {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<IPostItem> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const handleUpdate = () => {
    const title = prompt() || "";

    update({ ...post, title });
  };

  return (
    <div onClick={handleUpdate}>
      {post.id} {post.title}
      <button onClick={handleRemove}>Delete</button>{" "}
    </div>
  );
};

export default PostItem;
