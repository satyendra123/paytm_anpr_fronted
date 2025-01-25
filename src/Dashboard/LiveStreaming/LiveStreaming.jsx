import Entry from '../DashboardImages/Frame14.png'
import Exit from '../DashboardImages/Frame15.png'
import TotalVehicle from '../DashboardImages/Frame16.png'
import CarVideo from '../DashboardImages/CarVideo.png'
import Registration from '../DashboardImages/Frame17.png'
const LiveStreaming = ({x}) =>{

    return (

        <div>
             <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-1 grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Left Section */}
                    <div className="sm:col-span-5 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="shadow-md p-4 flex flex-col justify-center items-center rounded-lg gap-3" style={{ backgroundColor: '#A162F7' }}>
                            <img src={Entry} alt="Entry" className="rounded-full shadow-lg h-[50px] w-[50px]" />
                            <h2 className="text-white font-semibold text-[18.64px] leading-[24.27px]">Entry</h2>   
                            <h2 className="text-white font-semibold text-[18.64px] leading-[24.27px]">{x.total_entry}</h2>  
                        </div>

                        <div className="bg-white shadow-md p-4 flex flex-col justify-center items-center rounded-lg gap-3">
                            <img src={Exit} alt="Exit" className="rounded-full shadow-lg h-[50px] w-[50px]" />
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">Exit</h2>
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">{x.total_exit}</h2>      
                        </div>

                        <div className="bg-white shadow-md p-4 flex flex-col justify-center items-center rounded-lg gap-3">
                            <img src={TotalVehicle} alt="Total Vehicle" className="rounded-full shadow-lg h-[50px] w-[50px]" />
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">Total Vehicle</h2>
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">{x.total_car}</h2>    
                        </div>

                        <div className="bg-white shadow-md p-4 flex flex-col justify-center items-center rounded-lg gap-3">
                            <img src={Registration} alt="Registration" className="rounded-full shadow-lg h-[50px] w-[50px]" />
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">Registration</h2>
                            <h2 className="font-semibold text-[18.64px] leading-[24.27px]">{x.total_registration}</h2>  
                        </div>
                    </div>

                    {/* Live streaming video Section */}
                    <div className="sm:col-span-7 bg-white shadow-md rounded-md">
                        <img src="http://127.0.0.1:5000/video_feed" alt="" className="w-full h-[400px] object-cover rounded-md"/>
                    </div>
                </div>

        </div>
    )
}

export default LiveStreaming