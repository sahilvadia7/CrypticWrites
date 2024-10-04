import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import PostDetailPage from './pages/PostDetailPage.jsx';
import AboutProject from './pages/AboutProject.jsx';

// auth
import Login from './components/Login.jsx'; // Import Login component
import Register from './components/Register'; // Import Register component

// admin panel
import AdminPanel from './pages/admin/AdminPanel.jsx';
import ManageCreators from './pages/admin/ManageCreators';
import ViewAllPosts from './pages/admin/ViewAllPosts';
import ReportPostStatus from './pages/admin/ReportPostStatus';

// creator panel
import CreatorPanel from './pages/creator/CreatorPanel.jsx';
import CreatePost from './pages/creator/CreatePost.jsx';


const App = () => {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/about" element={<About />} />
        <Route path='/aboutProject' element={<AboutProject />}></Route>


      {/* admin panel */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/manage-creators" element={<ManageCreators />} />
        <Route path="/admin/view-all-posts" element={<ViewAllPosts />} />
        <Route path="/admin/report-post-status" element={<ReportPostStatus />} />

      {/* Creator panel */}
      <Route path='/creator' element={<CreatorPanel />} />
      <Route path='/creator/CreatePost' element={<CreatePost />} />



      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
    