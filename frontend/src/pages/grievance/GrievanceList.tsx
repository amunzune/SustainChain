import React, { useState, useEffect } from 'react';
import { grievanceService } from '../../services/api';

const GrievanceList = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setLoading(true);
        const response = await grievanceService.getAll();
        setGrievances(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load grievances');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGrievances();
  }, []);
  
  const filteredGrievances = filter === 'all' 
    ? grievances 
    : grievances.filter(grievance => grievance.status === filter);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Grievance Management</h1>
        <a 
          href="/grievances/new" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Log New Grievance
        </a>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="status" className="text-gray-700">Filter by Status:</label>
          <select
            id="status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Statuses</option>
            <option value="reported">Reported</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
        
        <a 
          href="/grievances/heatmap" 
          className="text-blue-600 hover:text-blue-900"
        >
          View Grievance Heatmap
        </a>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading grievances...</p>
        </div>
      ) : filteredGrievances.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="text-gray-500">No grievances found with the selected filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGrievances.map((grievance) => (
                <tr key={grievance.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(grievance.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{grievance.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        grievance.type === 'deforestation'
                          ? 'bg-green-100 text-green-800'
                          : grievance.type === 'labor'
                          ? 'bg-blue-100 text-blue-800'
                          : grievance.type === 'land_rights'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {grievance.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {grievance.supplier?.name || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{grievance.location}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        grievance.severity === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : grievance.severity === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : grievance.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {grievance.severity}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        grievance.status === 'reported'
                          ? 'bg-blue-100 text-blue-800'
                          : grievance.status === 'under_investigation'
                          ? 'bg-yellow-100 text-yellow-800'
                          : grievance.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {grievance.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <a
                      href={`/grievances/${grievance.id}`}
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
      )}
    </div>
  );
};

export default GrievanceList;
