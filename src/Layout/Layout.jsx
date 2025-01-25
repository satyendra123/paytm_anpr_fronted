import React from 'react';
import { Link } from 'react-router-dom';

import AddUser from './SidebarImages/AddUser.png';
import EditImage from './SidebarImages/EditImage.png';
import Report from './SidebarImages/Report.png';
import Search from './SidebarImages/Search.png';
import Support from './SidebarImages/Support.png';
import dashboard from './SidebarImages/dashboard.png';
import setting from './SidebarImages/setting.png';
import signout from './SidebarImages/signout.png';

const menuItems = [
    { id: 1, name: 'Dashboard', icon: dashboard, path: '/' },
    { id: 2, name: 'Register', icon: AddUser, path: '/register' },
    { id: 3, name: 'Report', icon: Report, path: '/report' },
    { id: 4, name: 'Configure', icon: Support, path: '/configure' },
    { id: 5, name: 'Edit Image', icon: EditImage, path: '/edit-image' },
    { id: 6, name: 'Search', icon: Search, path: '/search' },
    { id: 7, name: 'Settings', icon: setting, path: '/settings' },
    { id: 8, name: 'Sign Out', icon: signout, path: '/signout' },
];


const Layout = ({ children }) => {
    console.log(menuItems);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-white w-[100px] md:w-[100px] lg:w-[200px] min-h-screen shadow-md z-10">

                <h1 className="text-lg font-bold p-4 text-center">ANPR</h1>
                <div className="flex flex-col items-center mt-4">
                    {menuItems.map((item) => (
                        <Link key={item.id} to={item.path} className="flex flex-col items-center p-2 hover:bg-gray-100 cursor-pointer mb-[30px]">
                        <img src={item.icon} alt={item.name} className="h-12 w-12 mb-2" />
                        <span className="text-sm">{item.name}</span>
                    </Link>
                    
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full min-h-screen">{children}</div>
        </div>
    );
};

export default Layout;
