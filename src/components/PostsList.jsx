import PostsExcerpt from "./PostsExcerpt";
import { PostList } from "../MockData/PostList";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section>
      {posts.map((post) => (
        <PostsExcerpt key={post.id} post={post} />
      ))}
    </section>
  );
};
export default PostsList;
