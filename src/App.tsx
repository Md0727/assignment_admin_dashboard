import { jwtDecode } from 'jwt-decode';
import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const UserPage = lazy(() => import('./pages/Login'));
const DashboardLayout = lazy(() => import('./Layout/DashboardLayout'));
const MultiStepForm = lazy(() => import('./pages/MultiStepForm'));

// Private Route Wrapper for protected routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login page
      navigate('/');
    }
  }, [token, navigate]);

  return token ? children : null;
};

function App() {

  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Route: Login Page */}
          <Route path="/" element={<UserPage />} />

          {/* Protected Route: Dashboard */}
          <Route path="/admin" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route path="dashboard" element={<MultiStepForm />} />
            {/* Add other nested routes for the dashboard here */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
