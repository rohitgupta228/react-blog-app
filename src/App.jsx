import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
