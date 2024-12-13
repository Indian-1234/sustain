import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './homepage';
import Layout from './layout';
import DataTable from './DataGridTable.tsx';
import '../App.css';
import DataTableLogs from './reportdatagridtableLogs.js';
import DataTableList from './reportdatagridtableList.js';
import Login from './login.js';
import PlantDashboard from './plant/plantconponents.js';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
