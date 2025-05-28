import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-green-800 text-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">SustainChain</h1>
          <p className="text-sm text-green-300">Navigator</p>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            <li>
              <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-green-700">
                Dashboard
              </Link>
            </li>
            
            <li className="pt-4">
              <span className="block px-4 text-xs text-green-400 uppercase font-semibold">
                Traceability
              </span>
              <Link to="/traceability" className="block py-2 px-4 rounded hover:bg-green-700">
                Supply Chain Map
              </Link>
              <Link to="/suppliers" className="block py-2 px-4 rounded hover:bg-green-700">
                Suppliers
              </Link>
              <Link to="/products" className="block py-2 px-4 rounded hover:bg-green-700">
                Products
              </Link>
            </li>
            
            <li className="pt-4">
              <span className="block px-4 text-xs text-green-400 uppercase font-semibold">
                Monitoring
              </span>
              <Link to="/satellite" className="block py-2 px-4 rounded hover:bg-green-700">
                Satellite Monitoring
              </Link>
              <Link to="/grievances" className="block py-2 px-4 rounded hover:bg-green-700">
                Grievances
              </Link>
              <Link to="/grievances/heatmap" className="block py-2 px-4 rounded hover:bg-green-700">
                Grievance Heatmap
              </Link>
            </li>
            
            <li className="pt-4">
              <span className="block px-4 text-xs text-green-400 uppercase font-semibold">
                Performance
              </span>
              <Link to="/kpi" className="block py-2 px-4 rounded hover:bg-green-700">
                KPI Dashboard
              </Link>
            </li>
            
            <li className="pt-4">
              <span className="block px-4 text-xs text-green-400 uppercase font-semibold">
                Engagement
              </span>
              <Link to="/surveys" className="block py-2 px-4 rounded hover:bg-green-700">
                Surveys
              </Link>
            </li>
            
            {currentUser && currentUser.role === 'admin' && (
              <li className="pt-4">
                <span className="block px-4 text-xs text-green-400 uppercase font-semibold">
                  Administration
                </span>
                <Link to="/admin" className="block py-2 px-4 rounded hover:bg-green-700">
                  Admin Dashboard
                </Link>
                <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-green-700">
                  User Management
                </Link>
                <Link to="/admin/settings" className="block py-2 px-4 rounded hover:bg-green-700">
                  System Settings
                </Link>
                <Link to="/admin/api" className="block py-2 px-4 rounded hover:bg-green-700">
                  API Configuration
                </Link>
                <Link to="/admin/logs" className="block py-2 px-4 rounded hover:bg-green-700">
                  Audit Logs
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {/* Page title would go here */}
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{currentUser?.firstName} {currentUser?.lastName}</p>
                <p className="text-xs text-gray-500">{currentUser?.role}</p>
              </div>
              
              <div className="relative">
                <button 
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
