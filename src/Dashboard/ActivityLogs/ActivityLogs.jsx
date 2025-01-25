import React, { useState, useEffect } from "react";
import Search from "../DashboardImages/SearchIcon.png";
import { useActivityLogs } from "../../Context/ActivityLogsContext";

const ActivityLogs = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const { setSelectedRowData } = useActivityLogs();

  // Fetch data from the API endpoint
  useEffect(() => {
    fetch("http://127.0.0.1:8000/activity_log/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log(data)
          setActivityLogs(data);
          setSelectedRowData(data[0]);
        } else {
          console.error("No activity logs found.");
          setActivityLogs([]);
          setSelectedRowData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setActivityLogs([]);
        setSelectedRowData(null);
      });
  }, []);

  const handleRowClick = (logData) => {
    console.log("Row clicked:", logData);
    setSelectedRowData(logData);
  };

  return (
    <div>
      {/* Activity Log section */}
      <div className="shadow-md p-4">
        <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between p-4 shadow-lg">
          <div>
            <h1 className="font-bold text-[25px] text-[#211C37]">Activity Logs</h1>
            <p style={{ color: "#85878D" }}>View and Manage log</p>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <input
                type="text"
                className="border border-gray-300 rounded-l-lg rounded-r-lg py-2 px-4 h-10"
                placeholder="Search..."
              />
            </div>
            <div>
              <img src={Search} alt="Search Icon" className="h-10 w-10" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                  className={`${index % 2 === 0 ? "bg-gray-50" : ""} cursor-pointer`}
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
      </div>
    </div>
  );
};

export default ActivityLogs;
