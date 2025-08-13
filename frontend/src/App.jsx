import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BlogDashboard from './pages/Blog/Dashboard';
import SinglePost from './pages/Blog/SinglePost';
import AdminDashboard from './pages/Admin/Dashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<PrivateRoute><BlogDashboard /></PrivateRoute>} />
            <Route path="/blog/:id" element={<PrivateRoute><SinglePost /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;