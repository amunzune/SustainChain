import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-800 p-4 text-white text-center">
          <h1 className="text-2xl font-bold">SustainChain Navigator</h1>
          <p className="text-sm text-green-300">Forest Product Supply Chain Management</p>
        </div>
        
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
