import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboard();
        setDashboardData(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load admin dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      ) : dashboardData ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Users Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Users</h3>
                  <p className="text-3xl font-bold text-gray-700">{dashboardData.userCount}</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/admin/users" className="text-blue-600 hover:text-blue-900 text-sm">
                  Manage Users →
                </a>
              </div>
            </div>
            
            {/* Organizations Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Organizations</h3>
                  <p className="text-3xl font-bold text-gray-700">{dashboardData.organizationCount}</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/organizations" className="text-blue-600 hover:text-blue-900 text-sm">
                  View Organizations →
                </a>
              </div>
            </div>
            
            {/* Suppliers Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Suppliers</h3>
                  <p className="text-3xl font-bold text-gray-700">{dashboardData.supplierCount}</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/suppliers" className="text-blue-600 hover:text-blue-900 text-sm">
                  View Suppliers →
                </a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Grievances Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Grievance Status</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Grievances</p>
                  <p className="text-2xl font-bold text-gray-700">{dashboardData.grievanceCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Open Grievances</p>
                  <p className="text-2xl font-bold text-red-600">{dashboardData.openGrievanceCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resolution Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {dashboardData.grievanceCount > 0 
                      ? Math.round(((dashboardData.grievanceCount - dashboardData.openGrievanceCount) / dashboardData.grievanceCount) * 100) 
                      : 0}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${dashboardData.grievanceCount > 0 
                      ? Math.round(((dashboardData.grievanceCount - dashboardData.openGrievanceCount) / dashboardData.grievanceCount) * 100) 
                      : 0}%` 
                  }}
                ></div>
              </div>
              <div className="mt-4">
                <a href="/grievances" className="text-blue-600 hover:text-blue-900 text-sm">
                  View Grievances →
                </a>
              </div>
            </div>
            
            {/* Products Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Tracking</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold text-gray-700">{dashboardData.productCount}</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/products" className="text-blue-600 hover:text-blue-900 text-sm">
                  View Products →
                </a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/admin/settings" 
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p className="text-gray-700">System Settings</p>
                </a>
                
                <a 
                  href="/admin/api" 
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-gray-700">API Configuration</p>
                </a>
                
                <a 
                  href="/admin/logs" 
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  <p className="text-gray-700">Audit Logs</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="text-gray-500">No dashboard data available.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
