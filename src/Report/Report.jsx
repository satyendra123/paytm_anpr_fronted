import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Navbar from "../Dashboard/Navbar/Navbar";
import { jsPDF } from "jspdf";
import reload from "./ReportIcons/reload.png";
import download from "./ReportIcons/download.png";
import threedots from "./ReportIcons/threedots.png";
import dropdown from "./ReportIcons/dropdown.png";

const Report = () => {
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [selectedValues, setSelectedValues] = useState({
    gate_number: "null",
    plate_type: "null",
    vehicle_color: "null",
    vehicle_type: "null",
    status: "null",
    fromDate: null, // Entry Date
    toDate: null,   // Exit Date
    vehicle_number:null,
  });


  const [reportData, setReportData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch report data from backend
  const fetchReportData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gate_number: selectedValues.gate_number,
          plate_type: selectedValues.plate_type,
          vehicle_color: selectedValues.vehicle_color,
          vehicle_type: selectedValues.vehicle_type,
          status: selectedValues.status,
          fromDate: selectedValues.fromDate, // Include Entry Date
          toDate: selectedValues.toDate,     // Include Exit Date
          vehicle_number:selectedValues.vehicle_number
        }),
      });

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setReportData(data);
        setIsDataFetched(true);
      } else {
        console.error("Invalid data format received:", data);
        setIsDataFetched(false);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const handleSelect = (key, value) => {
    setSelectedValues({ ...selectedValues, [key]: value });
  };

  return (
    <Layout>
      {/* Navbar section */}
      <Navbar data="Report" />

      {/* Report section */}
      <div className="shadow-md">
        <div className="flex justify-between p-4">
          <div>
            <h1 className="font-bold text-[25px] text-[#211C37]">Report</h1>
            <p style={{ color: "#85878D" }}>View and Analyze Reports</p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 p-2 bg-gray-100 rounded-md shadow-md overflow-x-auto">
          {/* Entry Date */}
          <div className="flex flex-col">
            <label htmlFor="entry-date" className="text-center text-sm font-semibold text-gray-700 mb-1">From Date</label>
            <input type="date" id="entry-date" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("fromDate", e.target.value)} />
          </div>

          {/* Exit Date */}
          <div className="flex flex-col">
            <label htmlFor="exit-date" className="text-center text-sm font-semibold text-gray-700 mb-1">To Date</label>
            <input type="date" id="exit-date" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("toDate", e.target.value)} />
          </div>

          {/* Plate Type */}
          <div className="flex flex-col">
            <label htmlFor="plate-type" className="text-center text-sm font-semibold text-gray-700 mb-1">Plate Type</label>
            <select id="plate-type" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("plate_type", e.target.value)}>
              <option value="All">All</option>
              <option value="private">Private</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div className="flex flex-col">
            <label htmlFor="vehicle-type" className="text-center text-sm font-semibold text-gray-700 mb-1">Vehicle Type</label>
            <select id="vehicle-type" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("vehicle_type", e.target.value)}>
              <option value="All">All</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="truck">Truck</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          {/* Vehicle Color */}
          <div className="flex flex-col">
            <label htmlFor="vehicle-color" className="text-center text-sm font-semibold text-gray-700 mb-1">Vehicle Color</label>
            <select id="vehicle-color" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("vehicle_color", e.target.value)}>
              <option value="All">All</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="white">White</option>
            </select>
          </div>

          {/* Gate */}
          <div className="flex flex-col">
            <label htmlFor="gate-number" className="text-center text-sm font-semibold text-gray-700 mb-1">Gate</label>
            <select id="gate-number" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("gate_number", e.target.value)}>
              <option value="All">All</option>
              <option value="1">Gate 1</option>
              <option value="2">Gate 2</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-center text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select id="status" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleSelect("status", e.target.value)}>
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <div className="flex flex-col">
            <label htmlFor="vehicle-number" className="text-center text-sm font-semibold text-gray-700 mb-1">Vehicle Number</label>
            <input type="text" id="vehicle_number" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px]" onChange={(e) => handleSelect("vehicle_number", e.target.value)} />
          </div>

          {/* Submit Button */}
          <button type="button" onClick={fetchReportData} className="px-4 py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Report</button>
        </div>

        <div className="flex justify-between p-4">
          <p className="font-semibold text-[#242533]">Cross channel analysis</p>
          <div className="flex">
            <div><img src={reload} alt="" /></div>
            <div><img src={download} alt=""  className="cursor-pointer" /></div>
            <div><img src={threedots} alt="" /></div>
          </div>
        </div>

        {/* Display Report Data */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-semibold">
                <th className="px-4 py-2 text-center">Sr. No.</th>
                <th className="px-4 py-2 text-center">Date/Time</th>
                <th className="px-4 py-2 text-center">Gate No.</th>
                <th className="px-4 py-2 text-center">Vehicle No.</th>
                <th className="px-4 py-2 text-center">Plate Type</th>
                <th className="px-4 py-2 text-center">Vehicle Color</th>
                <th className="px-4 py-2 text-center">Vehicle Type</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Image</th>
              </tr>
            </thead>

            <tbody>
              {reportData.length > 0 ? (
                reportData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <div className="flex flex-col">
                      <span className=" px-2 py-2 text-center">{new Date(item.entry_time).toLocaleDateString()}</span>
                      <span className=" px-2 py-1 text-center text-sm">{new Date(item.entry_time).toLocaleTimeString()}</span>
                    </div>
                    <td className="px-4 py-2 text-center">{item.gate_number}</td>
                    <td className="px-4 py-2 text-center">{item.vehicle_number}</td>
                    <td className="px-4 py-2 text-center">{item.plate_type}</td>
                    <td className="px-4 py-2 text-center">{item.vehicle_color}</td>
                    <td className="px-4 py-2 text-center">{item.vehicle_type}</td>
                    <td className="px-4 py-2 text-center">{item.status}</td>
                    <td className="px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <img src={item.plate_image} alt="Vehicle" className="h-10 w-[100px]" />
                    </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
