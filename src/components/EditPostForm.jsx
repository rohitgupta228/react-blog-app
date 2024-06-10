import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../features/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const [formData, setFormData] = useState({
    title: post?.title,
    content: post?.body,
  });
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const canSave =
    [formData.title, formData.content].every(Boolean) &&
    requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title: formData.title,
            body: formData.content,
            reactions: post.reactions,
          })
        );
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      dispatch(deletePost({ id: post.id }));
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={formData.title}
          onChange={onChangeHandler}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="content"
          value={formData.content}
          onChange={onChangeHandler}
        />
        <div className="btn-groups">
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Update Post
          </button>
          <button
            className="deleteButton"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
