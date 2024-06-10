import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { PostList } from "../../MockData/PostList";

const initialState = {
  posts: PostList,
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare({ title, content }) {
        return {
          payload: {
            id: Date.now(),
            title: title,
            body: content,
            reactions: {
              thumbsUp: 0,
            },
          },
        };
      },
    },
    updatePost: {
      reducer(state, action) {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts.splice(index, 1, action.payload);
      },
    },
    deletePost: {
      reducer(state, action) {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts.splice(index, 1);
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postAdded, reactionAdded, updatePost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
