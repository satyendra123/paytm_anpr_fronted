import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import Navbar from '../Dashboard/Navbar/Navbar';
import searchIcon from './SearchIcon/search.png';
import Plate from '../Dashboard/DashboardImages/PlateImage.png'; // Import plate image or use appropriate path

export const SearchCar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchCarDetails = async (plateNumber) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/vehicle_search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle_number: plateNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setActivityLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchCarDetails(searchQuery);
    } else {
      setActivityLogs([]);
    }
  };

  const handleRowClick = (log) => {
    setSelectedLog(log);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedLog && selectedLog.vehicle_images.length > currentImageIndex + 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <Layout>
      <Navbar data="Search" />
      <div className="p-4 mt-5">
        <h1 className="font-semibold text-[24px] leading-[46.87px] text-center text-[#26272A] mb-2">
          Search Number Plate
        </h1>

        <div className="flex justify-center items-center">
          <div className="relative w-[715px] h-[50px] bg-white">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
            <img
              src={searchIcon}
              alt="search icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <button
            onClick={handleSearch}
            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {activityLogs.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-semibold">
                  <th className="px-4 py-2 text-center">Sr. No.</th>
                  <th className="px-4 py-2 text-center">Date/Time</th>
                  <th className="px-4 py-2 text-center">Gate No.</th>
                  <th className="px-4 py-2 text-center">Plate No.</th>
                  <th className="px-4 py-2 text-center">Plate Type</th>
                  <th className="px-4 py-2 text-center">Vehicle Color</th>
                  <th className="px-4 py-2 text-center">Vehicle Type</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Image</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {activityLogs.map((log, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : ''} cursor-pointer`}
                    onClick={() => handleRowClick(log)}
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex flex-col">
                        <span className="text-[#324DCF] font-bold">{new Date(log.entry_time).toLocaleDateString()}</span>
                        <span className="text-sm text-[#324DCF] font-bold">{new Date(log.entry_time).toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">{log.gate}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="bg-[#EDF5FE] text-[#3083FF] p-2 rounded-l-2xl rounded-r-2xl">
                        {log.vehicle_number}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">{log.plate_type}</td>
                    <td className="px-4 py-2 text-center">{log.vehicle_color}</td>
                    <td className="px-4 py-2 text-center">{log.vehicle_type}</td>
                    <td className="px-4 py-2 text-center">{log.status}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <img src={log.plate_image} alt="Plate" className="h-10 w-[100px]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedLog && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">Vehicle Details</h2>
            <div className="flex justify-center mt-4">
  <img 
    src={selectedLog.vehicle_images[currentImageIndex]} 
    alt="Vehicle" 
    className="h-40 w-auto" 
  />
</div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 focus:outline-none"
              >
                Prev
              </button>
              <button
                onClick={handleNextImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchCar;
