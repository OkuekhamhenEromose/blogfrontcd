import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Common/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BlogDashboard from "./pages/Blog/Dashboard";
import BlogForm from "./components/Blog/BlogForm";
import AllPosts from "./components/Blog/AllPosts";
import SinglePost from "./pages/Blog/SinglePost";
import ManagePost from "./pages/Blog/ManagePost";
import CategoryDetail from "./pages/Blog/CategoryDetail";
import AdminDashboard from "./pages/Admin/Dashboard";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/Common/PrivateRoute";
import { getCategories, getPost, createPost, updatePost } from "./api/blog";

// ✅ Create Wrapper
function CreatePostWrapper() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleBlogSubmit = async (formData) => {
    setLoading(true);
    await createPost(formData);
    setLoading(false);
  };

  return (
    <BlogForm
      categories={categories}
      onSubmit={handleBlogSubmit}
      isSubmitting={loading}
    />
  );
}

// ✅ Edit Wrapper
function EditPostWrapper() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getPost(id).then(setPostData);
  }, [id]);

  const handleBlogSubmit = async (formData) => {
    setLoading(true);
    await updatePost(id, formData);
    setLoading(false);
  };

  return (
    <BlogForm
      categories={categories}
      onSubmit={handleBlogSubmit}
      initialData={postData}
      isSubmitting={loading}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Home page WITHOUT Layout (so no footer & no duplicate navbar) */}
          <Route path="/" element={<Home />} />

          {/* ✅ Auth pages inside Layout */}
          <Route
            path="/login"
            element={
              <Layout showFooter={false}>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout showFooter={false}>
                <Register />
              </Layout>
            }
          />

          {/* ✅ Blog pages inside Layout */}
          <Route
            path="/blog"
            element={
              <Layout>
                <PrivateRoute>
                  <BlogDashboard />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/create"
            element={
              <Layout>
                <PrivateRoute>
                  <CreatePostWrapper />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/all"
            element={
              <Layout>
                <PrivateRoute>
                  <AllPosts />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/:id/edit"
            element={
              <Layout>
                <PrivateRoute>
                  <EditPost />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Layout>
                <PrivateRoute>
                  <SinglePost />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/:id/manage"
            element={
              <Layout>
                <PrivateRoute>
                  <ManagePost />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <Layout>
                <PrivateRoute>
                  <CategoryDetail />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* ✅ Admin */}
          <Route
            path="/admin"
            element={
              <Layout>
                <PrivateRoute admin>
                  <AdminDashboard />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* ✅ 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
