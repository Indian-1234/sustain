import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Layout from './layout';
import DataTable from './DataGridTable.tsx';
import '../App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-profile" element={<DataTable />} />

          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
