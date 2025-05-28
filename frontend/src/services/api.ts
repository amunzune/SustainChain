import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (username: string, password: string) => api.post('/auth/signin', { username, password }),
  signup: (userData: any) => api.post('/auth/signup', userData),
};

// Organization services
export const organizationService = {
  getAll: () => api.get('/organizations'),
  getById: (id: string) => api.get(`/organizations/${id}`),
  create: (data: any) => api.post('/organizations', data),
  update: (id: string, data: any) => api.put(`/organizations/${id}`, data),
  delete: (id: string) => api.delete(`/organizations/${id}`),
};

// Supplier services
export const supplierService = {
  getAll: () => api.get('/suppliers'),
  getById: (id: string) => api.get(`/suppliers/${id}`),
  create: (data: any) => api.post('/suppliers', data),
  update: (id: string, data: any) => api.put(`/suppliers/${id}`, data),
  delete: (id: string) => api.delete(`/suppliers/${id}`),
  calculateRisk: (id: string) => api.post(`/suppliers/${id}/calculate-risk`),
};

// Product services
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  getBySupplier: (supplierId: string) => api.get(`/products/supplier/${supplierId}`),
  verify: (id: string, data: any) => api.put(`/products/${id}/verify`, data),
};

// Supply Chain services
export const supplyChainService = {
  getAllNodes: () => api.get('/supply-chain/nodes'),
  getNodeById: (id: string) => api.get(`/supply-chain/nodes/${id}`),
  createNode: (data: any) => api.post('/supply-chain/nodes', data),
  updateNode: (id: string, data: any) => api.put(`/supply-chain/nodes/${id}`, data),
  deleteNode: (id: string) => api.delete(`/supply-chain/nodes/${id}`),
  getNodesByProduct: (productId: string) => api.get(`/supply-chain/nodes/product/${productId}`),
  
  getAllConnections: () => api.get('/supply-chain/connections'),
  getConnectionById: (id: string) => api.get(`/supply-chain/connections/${id}`),
  createConnection: (data: any) => api.post('/supply-chain/connections', data),
  updateConnection: (id: string, data: any) => api.put(`/supply-chain/connections/${id}`, data),
  deleteConnection: (id: string) => api.delete(`/supply-chain/connections/${id}`),
  
  getSupplyChainMap: () => api.get('/supply-chain/map'),
  importSupplyChainData: (data: any) => api.post('/supply-chain/import', data),
};

// Grievance services
export const grievanceService = {
  getAll: () => api.get('/grievances'),
  getById: (id: string) => api.get(`/grievances/${id}`),
  create: (data: any) => api.post('/grievances', data),
  update: (id: string, data: any) => api.put(`/grievances/${id}`, data),
  delete: (id: string) => api.delete(`/grievances/${id}`),
  getBySupplier: (supplierId: string) => api.get(`/grievances/supplier/${supplierId}`),
  getHeatmap: () => api.get('/grievances/heatmap/data'),
};

// Satellite services
export const satelliteService = {
  getAll: () => api.get('/satellite'),
  getById: (id: string) => api.get(`/satellite/${id}`),
  create: (data: any) => api.post('/satellite', data),
  update: (id: string, data: any) => api.put(`/satellite/${id}`, data),
  delete: (id: string) => api.delete(`/satellite/${id}`),
  getByRegion: (region: string) => api.get(`/satellite/region/${region}`),
  generateMock: (data: any) => api.post('/satellite/generate-mock', data),
};

// KPI services
export const kpiService = {
  getAll: () => api.get('/kpis'),
  getById: (id: string) => api.get(`/kpis/${id}`),
  create: (data: any) => api.post('/kpis', data),
  update: (id: string, data: any) => api.put(`/kpis/${id}`, data),
  delete: (id: string) => api.delete(`/kpis/${id}`),
  getByOrganization: (organizationId: string) => api.get(`/kpis/organization/${organizationId}`),
  getByCategory: (category: string, organizationId: string) => 
    api.get(`/kpis/category/${category}?organizationId=${organizationId}`),
  calculateDCF: (organizationId: string) => api.get(`/kpis/calculate/dcf/${organizationId}`),
  calculateGrievanceResolution: (organizationId: string) => 
    api.get(`/kpis/calculate/grievance-resolution/${organizationId}`),
  calculateSupplierSustainability: (organizationId: string) => 
    api.get(`/kpis/calculate/supplier-sustainability/${organizationId}`),
};

// Survey services
export const surveyService = {
  getAll: () => api.get('/surveys'),
  getById: (id: string) => api.get(`/surveys/${id}`),
  create: (data: any) => api.post('/surveys', data),
  update: (id: string, data: any) => api.put(`/surveys/${id}`, data),
  delete: (id: string) => api.delete(`/surveys/${id}`),
  getByOrganization: (organizationId: string) => api.get(`/surveys/organization/${organizationId}`),
  addQuestion: (surveyId: string, data: any) => api.post(`/surveys/${surveyId}/questions`, data),
  getQuestions: (surveyId: string) => api.get(`/surveys/${surveyId}/questions`),
  submitResponses: (data: any) => api.post('/surveys/responses', data),
  getResponses: (surveyId: string) => api.get(`/surveys/${surveyId}/responses`),
};

// Admin services
export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUserRoles: () => api.get('/admin/user-roles'),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data: any) => api.put('/admin/settings', data),
  getApiConfig: () => api.get('/admin/api-config'),
  updateApiConfig: (data: any) => api.put('/admin/api-config', data),
  getAuditLogs: () => api.get('/admin/audit-logs'),
};

export default api;
