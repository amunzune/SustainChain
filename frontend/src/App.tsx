import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout components
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard pages
import Dashboard from './pages/Dashboard';

// Module pages
import TraceabilityMap from './pages/traceability/TraceabilityMap';
import SupplierList from './pages/traceability/SupplierList';
import SupplierDetail from './pages/traceability/SupplierDetail';
import ProductList from './pages/traceability/ProductList';
import ProductDetail from './pages/traceability/ProductDetail';

import SatelliteMonitoring from './pages/satellite/SatelliteMonitoring';
import AlertDetail from './pages/satellite/AlertDetail';

import GrievanceList from './pages/grievance/GrievanceList';
import GrievanceDetail from './pages/grievance/GrievanceDetail';
import GrievanceForm from './pages/grievance/GrievanceForm';
import GrievanceHeatmap from './pages/grievance/GrievanceHeatmap';

import KPIDashboard from './pages/dashboard/KPIDashboard';
import KPIDetail from './pages/dashboard/KPIDetail';

import SurveyList from './pages/supplier/SurveyList';
import SurveyDetail from './pages/supplier/SurveyDetail';
import SurveyForm from './pages/supplier/SurveyForm';
import SurveyResponses from './pages/supplier/SurveyResponses';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import ApiConfiguration from './pages/admin/ApiConfiguration';
import AuditLogs from './pages/admin/AuditLogs';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && currentUser.role !== requiredRole && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          
          {/* Dashboard routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Traceability module */}
            <Route path="/traceability" element={<TraceabilityMap />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/:id" element={<SupplierDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            
            {/* Satellite module */}
            <Route path="/satellite" element={<SatelliteMonitoring />} />
            <Route path="/satellite/:id" element={<AlertDetail />} />
            
            {/* Grievance module */}
            <Route path="/grievances" element={<GrievanceList />} />
            <Route path="/grievances/new" element={<GrievanceForm />} />
            <Route path="/grievances/:id" element={<GrievanceDetail />} />
            <Route path="/grievances/heatmap" element={<GrievanceHeatmap />} />
            
            {/* KPI module */}
            <Route path="/kpi" element={<KPIDashboard />} />
            <Route path="/kpi/:id" element={<KPIDetail />} />
            
            {/* Supplier engagement module */}
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/surveys/new" element={
              <ProtectedRoute requiredRole="analyst">
                <SurveyForm />
              </ProtectedRoute>
            } />
            <Route path="/surveys/:id" element={<SurveyDetail />} />
            <Route path="/surveys/:id/responses" element={
              <ProtectedRoute requiredRole="analyst">
                <SurveyResponses />
              </ProtectedRoute>
            } />
            
            {/* Admin module */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <SystemSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/api" element={
              <ProtectedRoute requiredRole="admin">
                <ApiConfiguration />
              </ProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <ProtectedRoute requiredRole="admin">
                <AuditLogs />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
