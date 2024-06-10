import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAdded } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const canSave =
    [formData.title, formData.content].every(Boolean) &&
    addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        dispatch(
          postAdded({ title: formData.title, content: formData.content })
        );
        setFormData({ title: "", content: "" });
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
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
            Save Post
          </button>
          <button
            type="button"
            onClick={() => setFormData({ title: "", content: "" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddPostForm;
