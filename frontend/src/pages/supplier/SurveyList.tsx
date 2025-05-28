import React, { useState, useEffect } from 'react';
import { surveyService } from '../../services/api';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const response = await surveyService.getAll();
        setSurveys(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load surveys');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSurveys();
  }, []);
  
  const filteredSurveys = filter === 'all' 
    ? surveys 
    : surveys.filter(survey => survey.status === filter);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Engagement Surveys</h1>
        <a 
          href="/surveys/new" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Create New Survey
        </a>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-4 mb-6">
        <label htmlFor="status" className="text-gray-700">Filter by Status:</label>
        <select
          id="status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading surveys...</p>
        </div>
      ) : filteredSurveys.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="text-gray-500">No surveys found with the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys.map((survey) => (
            <div 
              key={survey.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{survey.title}</h3>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      survey.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : survey.status === 'draft'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {survey.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{survey.description}</p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div>
                    <span className="font-medium">Start:</span>{' '}
                    {survey.startDate ? new Date(survey.startDate).toLocaleDateString() : 'Not set'}
                  </div>
                  <div>
                    <span className="font-medium">End:</span>{' '}
                    {survey.endDate ? new Date(survey.endDate).toLocaleDateString() : 'Not set'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Response Rate</span>
                    <span className="text-gray-700">{Math.round(survey.responseRate * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.round(survey.responseRate * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <a
                    href={`/surveys/${survey.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </a>
                  
                  {survey.status === 'active' && (
                    <a
                      href={`/surveys/${survey.id}/responses`}
                      className="text-green-600 hover:text-green-900"
                    >
                      View Responses
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyList;
