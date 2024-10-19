import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import PostDetailPage from './pages/PostDetailPage';
import AboutProject from './pages/AboutProject';

// auth
import Login from './components/Login';
import Register from './components/Register';

// admin panel
import AdminPanel from './pages/admin/AdminPanel';
import ManageCreators from './pages/admin/ManageCreators';
import ViewAllPosts from './pages/admin/ViewAllPosts';
import ReportPostStatus from './pages/admin/ReportPostStatus';
import ManageApplication from './pages/admin/ManageApplication';

// creator panel
import CreatorPanel from './pages/creator/CreatorPanel';
import CreatePost from './pages/creator/CreatePost';

// Protected Route component for role-based route protection
import ProtectedRoute from './components/ProtectedRoute';
import ManagePost from './pages/creator/ManagePost';

//become creator
import GetInTouch from './components/GetInTouch';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // Loading state to handle token check

    // Check if a token exists in localStorage on app mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // Set authenticated if token exists
        }
        setIsLoading(false);  // Stop loading once token check is complete
    }, []);

    // Function to protect routes
    const ProtectedAuthRoute = ({ children }) => {
        if (isLoading) return null;  // Show nothing or a loading spinner while checking token
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/aboutProject" element={<AboutProject />} />
                <Route path="/get-in-touch" element={<GetInTouch />} />

                {/* Admin Panel - Only accessible by admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminPanel />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
                <Route
                    path="/admin/manage-creators"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ManageCreators />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
                <Route
                    path="/admin/ManageApplication"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ManageApplication />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
                <Route
                    path="/admin/view-all-posts"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ViewAllPosts />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
                <Route
                    path="/admin/report-post-status"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ReportPostStatus />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />

                {/* Creator Panel - Only accessible by creator */}
                <Route
                    path="/creator"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['creator']}>
                                <CreatorPanel />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
                <Route
                    path="/creator/createpost"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['creator']}>
                                <CreatePost />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />

                <Route
                    path="/creator/ManagePost"
                    element={
                        <ProtectedAuthRoute>
                            <ProtectedRoute allowedRoles={['creator']}>
                                <ManagePost />
                            </ProtectedRoute>
                        </ProtectedAuthRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
