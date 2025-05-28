import React, { useState, useEffect } from 'react';
import { satelliteService } from '../../services/api';

const SatelliteMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await satelliteService.getAll();
        setAlerts(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load satellite alerts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlerts();
  }, []);
  
  const handleGenerateMockAlerts = async () => {
    try {
      setLoading(true);
      const response = await satelliteService.generateMock({
        count: 5,
        region: selectedRegion !== 'all' ? selectedRegion : undefined
      });
      
      // Refresh alerts
      const alertsResponse = await satelliteService.getAll();
      setAlerts(alertsResponse.data);
      
      setError('');
    } catch (err) {
      setError('Failed to generate mock alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredAlerts = selectedRegion === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.region === selectedRegion);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Satellite Monitoring</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="region" className="text-gray-700">Filter by Region:</label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Regions</option>
            <option value="southeast_asia">Southeast Asia</option>
            <option value="amazon">Amazon</option>
            <option value="congo_basin">Congo Basin</option>
          </select>
        </div>
        
        <button
          onClick={handleGenerateMockAlerts}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          disabled={loading}
        >
          Generate Mock Alerts
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Satellite Imagery</h2>
        </div>
        
        {/* This would be replaced with an actual map component using Leaflet.js or Mapbox */}
        <div className="h-96 bg-white border border-gray-300 rounded flex items-center justify-center">
          <p className="text-gray-500">
            Satellite imagery with alert overlays would be rendered here
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts ({filteredAlerts.length})</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <p className="text-gray-500">Loading alerts...</p>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="bg-white p-4 rounded border border-gray-200 text-center">
            <p className="text-gray-500">No alerts found for the selected region.</p>
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
                    Region
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {new Date(alert.alertDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {alert.region} ({alert.country})
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">{alert.type}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          alert.severity === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : alert.severity === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : alert.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          alert.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : alert.status === 'investigating'
                            ? 'bg-purple-100 text-purple-800'
                            : alert.status === 'confirmed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <a
                        href={`/satellite/${alert.id}`}
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
    </div>
  );
};

export default SatelliteMonitoring;
