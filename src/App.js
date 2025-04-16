import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';
import 'antd/dist/reset.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import StudentProfile from './pages/StudentProfile';
import CourseDetails from './pages/CourseDetails';

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Yükleniyor...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route 
          path="/dashboard" 
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/students/:studentId" 
          element={currentUser ? <StudentProfile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/courses/:courseId" 
          element={currentUser ? <CourseDetails /> : <Navigate to="/login" />} 
        />
      </Route>
    </Routes>
  );
};

export default App;