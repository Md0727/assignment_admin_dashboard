// DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
