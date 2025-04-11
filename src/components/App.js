import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import nprogress from 'nprogress'; // Import nprogress for progress bar
import 'nprogress/nprogress.css'; // Import styles for the progress bar
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
import STPMonitoringDashboard from './stp/stp.jsx';
import WTPFirePumpMonitoringDashboard from './stp/wtp.jsx';
import LiftMonitoringSystem from './stp/lift.jsx';
import DgUpsMonitoringDashboard from './stp/dgups.jsx';
import TransformerMonitoringDashboard from './stp/transforer.jsx';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Scroll Progress Bar Component for route transitions
const ScrollProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start progress bar on route change
    nprogress.configure({ showSpinner: false });

    nprogress.start();

    // End the progress bar after a delay to simulate loading
    const timer = setTimeout(() => {
      nprogress.done();
    }, 300); // Adjust this timeout as needed

    return () => {
      clearTimeout(timer); // Cleanup on unmount
    };
  }, [location]); // Rerun whenever the location (route) changes

  return null;
};

function App() {
  return (
    <Router>
      <ScrollProgressBar />
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
          path="/stp"
          element={
            <PrivateRoute>
              <Layout>
                <STPMonitoringDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
          <Route
          path="/wtp"
          element={
            <PrivateRoute>
              <Layout>
                <WTPFirePumpMonitoringDashboard />
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
          path="/lift"
          element={
            <PrivateRoute>
              <Layout>
                <LiftMonitoringSystem />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dgups"
          element={
            <PrivateRoute>
              <Layout>
                <DgUpsMonitoringDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transformer"
          element={
            <PrivateRoute>
              <Layout>
                <TransformerMonitoringDashboard />
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
