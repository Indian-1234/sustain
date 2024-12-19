import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import nprogress from 'nprogress'; // Import nprogress for progress bar
import 'nprogress/nprogress.css'; // Import nprogress styles
import HomePage from './homepage';
import Layout from './layout';
import DataTable from './DataGridTable.tsx';
import '../App.css';
import DataTableLogs from './reportdatagridtableLogs.js';
import DataTableList from './reportdatagridtableList.js';
import Login from './login.js';
import PlantDashboard from './plant/plantconponents.js';
import Dashboardassets from './plant/assetsInsights.js';
import AssetDashboard from './assetsdetails.js';
import AddUserForm from './user/adduser.js';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Monitor Route Changes and Control Progress Bar
const useProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start the progress bar when route changes
    nprogress.start();

    // Finish the progress bar after a delay to simulate loading
    const timer = setTimeout(() => {
      nprogress.done();
    }, 1000); // Customize the timeout based on your page load time

    // Cleanup the timer to avoid memory leaks
    return () => {
      clearTimeout(timer);
    };
  }, [location]); // Re-run this effect when the route changes
};

function App() {
  useProgressBar(); // Initialize the progress bar handler

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <HomePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <Layout>
                <DataTable />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/report-list"
          element={
            <PrivateRoute>
              <Layout>
                <DataTableList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/report-logs"
          element={
            <PrivateRoute>
              <Layout>
                <DataTableLogs />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/plant/:plantName"
          element={
            <PrivateRoute>
              <Layout>
                <PlantDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/plant/assets"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboardassets />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/plant/assets/:name"
          element={
            <PrivateRoute>
              <Layout>
                <AssetDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <PrivateRoute>
              <Layout>
                <AddUserForm />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
