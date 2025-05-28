import React, { useState, useEffect } from 'react';
import { kpiService } from '../../services/api';

const KPIDashboard = () => {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [calculatedKPIs, setCalculatedKPIs] = useState({
    dcf: null,
    grievanceResolution: null,
    supplierSustainability: null
  });
  
  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        const response = await kpiService.getAll();
        setKpis(response.data);
        
        // For demo purposes, use the first organization ID found
        if (response.data.length > 0 && response.data[0].organizationId) {
          setOrganizationId(response.data[0].organizationId);
        }
        
        setError('');
      } catch (err) {
        setError('Failed to load KPIs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchKPIs();
  }, []);
  
  useEffect(() => {
    const calculateKPIs = async () => {
      if (!organizationId) return;
      
      try {
        setLoading(true);
        
        const [dcfResponse, grievanceResponse, supplierResponse] = await Promise.all([
          kpiService.calculateDCF(organizationId),
          kpiService.calculateGrievanceResolution(organizationId),
          kpiService.calculateSupplierSustainability(organizationId)
        ]);
        
        setCalculatedKPIs({
          dcf: dcfResponse.data,
          grievanceResolution: grievanceResponse.data,
          supplierSustainability: supplierResponse.data
        });
        
        setError('');
      } catch (err) {
        setError('Failed to calculate KPIs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    calculateKPIs();
  }, [organizationId]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">KPI Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading KPI data...</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* DCF KPI Card */}
            {calculatedKPIs.dcf && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {calculatedKPIs.dcf.kpiName}
                </h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-green-700">
                    {calculatedKPIs.dcf.value}
                  </span>
                  <span className="text-gray-500 mb-1">{calculatedKPIs.dcf.unit}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${calculatedKPIs.dcf.value}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">Target: {calculatedKPIs.dcf.target}%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      calculatedKPIs.dcf.trend === 'increasing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {calculatedKPIs.dcf.trend === 'increasing' ? '↑' : '↓'} {calculatedKPIs.dcf.trend}
                  </span>
                </div>
              </div>
            )}
            
            {/* Grievance Resolution KPI Card */}
            {calculatedKPIs.grievanceResolution && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {calculatedKPIs.grievanceResolution.kpiName}
                </h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-blue-700">
                    {calculatedKPIs.grievanceResolution.value}
                  </span>
                  <span className="text-gray-500 mb-1">{calculatedKPIs.grievanceResolution.unit}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${calculatedKPIs.grievanceResolution.value}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">Target: {calculatedKPIs.grievanceResolution.target}%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      calculatedKPIs.grievanceResolution.trend === 'increasing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {calculatedKPIs.grievanceResolution.trend === 'increasing' ? '↑' : '↓'} {calculatedKPIs.grievanceResolution.trend}
                  </span>
                </div>
              </div>
            )}
            
            {/* Supplier Sustainability KPI Card */}
            {calculatedKPIs.supplierSustainability && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {calculatedKPIs.supplierSustainability.kpiName}
                </h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-purple-700">
                    {calculatedKPIs.supplierSustainability.value}
                  </span>
                  <span className="text-gray-500 mb-1">{calculatedKPIs.supplierSustainability.unit}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${calculatedKPIs.supplierSustainability.value}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">Target: {calculatedKPIs.supplierSustainability.target}%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      calculatedKPIs.supplierSustainability.trend === 'increasing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {calculatedKPIs.supplierSustainability.trend === 'increasing' ? '↑' : '↓'} {calculatedKPIs.supplierSustainability.trend}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">All KPIs</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi) => (
                    <tr key={kpi.id}>
                      <td className="py-2 px-4 border-b border-gray-200">{kpi.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            kpi.category === 'environmental'
                              ? 'bg-green-100 text-green-800'
                              : kpi.category === 'social'
                              ? 'bg-blue-100 text-blue-800'
                              : kpi.category === 'governance'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {kpi.category}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {kpi.value} {kpi.unit}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {kpi.target} {kpi.unit}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            kpi.status === 'on_track'
                              ? 'bg-green-100 text-green-800'
                              : kpi.status === 'at_risk'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {kpi.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {new Date(kpi.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <a
                          href={`/kpi/${kpi.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIDashboard;
