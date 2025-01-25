import { useState, useEffect } from 'react';
import { useActivityLogs } from './../Context/ActivityLogsContext';
import Layout from '../Layout/Layout';
import Navbar from './Navbar/Navbar';
import LiveStreaming from './LiveStreaming/LiveStreaming';
import ActivityLogs from './ActivityLogs/ActivityLogs';

import vehicleNumber from './DashboardImages/VehicleType.png'
import vehicleType from './DashboardImages/VehicleType.png'
import vehicleColor from './DashboardImages/VehicleColor.png'
import Gate from './DashboardImages/Tollbooth.png'
import Status from './DashboardImages/Status.png'
import Signal from './DashboardImages/RFIDSignal.png'

const Dashboard = () => {

  const [data, setData] = useState({
    total_entry: 0,
    total_exit: 0,
    total_car: 0,
    total_registration: 0
  });

  const { selectedRowData } = useActivityLogs();
  const [vehicleData, setVehicleData] = useState({
    id:'',
    vehicleNumber: '',
    vehicleType: '',
    vehicleColor: '',
    gateNumber: '',
    status: '',
    signal: ''
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Ensure images is always an array
  const images = selectedRowData && selectedRowData.vehicle_images ? selectedRowData.vehicle_images : [];

  useEffect(() => {
    if (selectedRowData) {
      console.log('Selected Row Data:', selectedRowData); // Debug log to check data
      const updatedData = {
        id:selectedRowData.id || '',
        vehicleNumber: selectedRowData.vehicle_number || '',
        vehicleType: selectedRowData.vehicle_type || '',
        vehicleColor: selectedRowData.vehicle_color || '',
        gateNumber: selectedRowData.gate || '',
        status: selectedRowData.status || '',
      };

      setVehicleData(updatedData);
    }
  }, [selectedRowData]);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/dashboard_data/");
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (e) {
        console.log("Error while fetching the data:", e);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  },[]);

  const handleBackward = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleForward = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...vehicleData,
      id: vehicleData.id,
    };
    fetch('http://127.0.0.1:8000/savevehicle_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data saved:", data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };
  
  return (
    <Layout>
      <Navbar data="Dashboard" />
      <div className="p-3">
        <LiveStreaming x={data}/>

        <div className="grid grid-cols-12 gap-4 p-3 mt-5">
          {/* Car Image section */}
          <div className="col-span-12 sm:col-span-5 relative">
            {images.length > 0 ? (
              <img src={images[currentIndex]} alt={`Gate ${vehicleData.gateNumber}-Car ${currentIndex + 1}`} className="w-full h-full object-contain" />
            ) : (
              <p>No images available</p>
            )}
            <div className="absolute bottom-2 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center gap-8">
              <button onClick={handleBackward} className="text-white rounded-full p-2">
                <i className="fas fa-backward"></i>
              </button>
              <button className="text-white rounded-full p-2">
                <i className="fas fa-play"></i>
              </button>
              <button onClick={handleForward} className="text-white rounded-full p-2">
                <i className="fas fa-forward"></i>
              </button>
            </div>
          </div>
          {/* Form section */}
          <div className="col-span-12 sm:col-span-7 shadow-md p-5 relative">
            <form className="grid grid-cols-2 gap-4 mt-4" onSubmit={handleFormSubmit}>
              <button type="submit" className="absolute top-2 right-5 mb-5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                <i className="fas fa-save ml-2 mr-2"></i>
              </button>
              <div className="flex flex-col mt-3">
                <label htmlFor="vehicleNumber" className="flex items-center mb-2 text-[#7c7c8D]">
                  Vehicle No
                  <img src={vehicleNumber} alt="Vehicle Type" className="ml-2 h-5 w-5" />
                </label>
                <input
                  type="text"
                  value={vehicleData.vehicleNumber}
                  onChange={handleInputChange}
                  id="vehicleNumber"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Vehicle Number"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="vehicleType" className="flex items-center mb-2  text-[#7c7c8D]">Vehicle Type
                <img src={vehicleType} alt="Vehicle Type" className="ml-2 h-5 w-5" /></label>
                <input
                  type="text"
                  value={vehicleData.vehicleType}
                  onChange={handleInputChange}
                  id="vehicleType"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Vehicle Type"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vehicleColor" className="flex items-center mb-2 text-[#7c7c8D]">Vehicle Color
                <img src={vehicleColor} alt="Vehicle Type" className="ml-2 h-5 w-5" /></label>
                <input
                  type="text"
                  value={vehicleData.vehicleColor}
                  onChange={handleInputChange}
                  id="vehicleColor"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Vehicle Color"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gateNumber" className="flex items-center mb-2 text-[#7c7c8D]">Gate Number
                <img src={Gate} alt="Vehicle Type" className="ml-2 h-5 w-5" /></label>
                <input
                  type="text"
                  value={vehicleData.gateNumber}
                  onChange={handleInputChange}
                  id="gateNumber"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Gate Number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="flex items-center mb-2 text-[#7c7c8D]">Status
                <img src={Status} alt="Vehicle Type" className="ml-2 h-5 w-5" /></label>
                <input
                  type="text"
                  value={vehicleData.status}
                  onChange={handleInputChange}
                  id="status"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Status"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="signal" className="flex items-center mb-2 text-[#7c7c8D]">Signal
                <img src={Signal} alt="Vehicle Type" className="ml-2 h-5 w-5" /></label>
                <input
                  type="text"
                  value={vehicleData.signal}
                  onChange={handleInputChange}
                  id="signal"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Signal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ActivityLogs />
    </Layout>
  );
};

export default Dashboard;
