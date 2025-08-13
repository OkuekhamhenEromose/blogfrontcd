import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="layout">
      <Navbar user={user} logout={logout} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;