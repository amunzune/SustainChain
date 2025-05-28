import React, { useState, useEffect } from 'react';
import { supplyChainService } from '../../services/api';

const TraceabilityMap = () => {
  const [mapData, setMapData] = useState({ nodes: [], connections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const response = await supplyChainService.getSupplyChainMap();
        setMapData(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load supply chain map data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMapData();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Supply Chain Traceability Map</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Loading map data...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Interactive Map</h2>
              <div className="flex space-x-2">
                <button className="bg-green-700 text-white px-3 py-1 rounded text-sm">
                  Import Data
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Export Map
                </button>
              </div>
            </div>
            
            {/* This would be replaced with an actual map component using Leaflet.js or Mapbox */}
            <div className="h-96 bg-white border border-gray-300 rounded flex items-center justify-center">
              <p className="text-gray-500">
                Map visualization would be rendered here using Leaflet.js or Mapbox
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Supply Chain Nodes ({mapData.nodes.length})</h3>
              <div className="max-h-64 overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapData.nodes.map((node) => (
                      <tr key={node.id}>
                        <td className="py-2 px-4 border-b border-gray-200">{node.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{node.type}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              node.riskLevel === 'high'
                                ? 'bg-red-100 text-red-800'
                                : node.riskLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {node.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Connections ({mapData.connections.length})</h3>
              <div className="max-h-64 overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verified
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapData.connections.map((connection) => (
                      <tr key={connection.id}>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {mapData.nodes.find(n => n.id === connection.source)?.name || 'Unknown'}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {mapData.nodes.find(n => n.id === connection.target)?.name || 'Unknown'}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">{connection.type}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {connection.isVerified ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Unverified
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraceabilityMap;
