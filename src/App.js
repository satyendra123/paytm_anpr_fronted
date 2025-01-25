import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard'; // Adjust path as necessary
import Report from './Report/Report';
import Search from './SearchCar/SearchCar';
import { ActivityLogsProvider } from './Context/ActivityLogsContext'; // Import the provider

function App() {
  return (
    <ActivityLogsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </ActivityLogsProvider>
  );
}

export default App;
