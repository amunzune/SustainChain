#!/usr/bin/env node

// This script validates the SustainChain Navigator platform
// It checks database connections, API endpoints, and cross-module integration

const axios = require('axios');
const colors = require('colors/safe');

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:8080/api';
let authToken = null;

// Test credentials
const TEST_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

// Validation results
const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  total: 0
};

// Helper functions
const logSuccess = (message) => {
  console.log(colors.green('✓ ' + message));
  results.passed++;
  results.total++;
};

const logError = (message, error) => {
  console.log(colors.red('✗ ' + message));
  if (error) {
    console.log(colors.gray('  Error: ' + (error.response?.data?.message || error.message)));
  }
  results.failed++;
  results.total++;
};

const logInfo = (message) => {
  console.log(colors.blue('ℹ ' + message));
};

const logWarning = (message) => {
  console.log(colors.yellow('⚠ ' + message));
  results.skipped++;
  results.total++;
};

const logSection = (title) => {
  console.log('\n' + colors.cyan.bold('▶ ' + title));
};

// API client with auth token
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers['x-access-token'] = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Main validation function
async function validatePlatform() {
  console.log(colors.bold('\n🔍 SustainChain Navigator Platform Validation\n'));
  
  try {
    // 1. Test database connection and seeding
    await validateDatabase();
    
    // 2. Test authentication
    await validateAuthentication();
    
    // 3. Test core modules
    await validateCoreModules();
    
    // 4. Test cross-module integration
    await validateCrossModuleIntegration();
    
    // 5. Test user roles and permissions
    await validateUserRoles();
    
    // Summary
    logSection('Validation Summary');
    console.log(colors.bold(`Total tests: ${results.total}`));
    console.log(colors.green(`Passed: ${results.passed}`));
    console.log(colors.red(`Failed: ${results.failed}`));
    console.log(colors.yellow(`Skipped: ${results.skipped}`));
    
    if (results.failed === 0) {
      console.log(colors.green.bold('\n✅ All tests passed! The platform is ready for deployment.'));
    } else {
      console.log(colors.red.bold(`\n❌ ${results.failed} tests failed. Please fix the issues before deployment.`));
      process.exit(1);
    }
  } catch (error) {
    logError('Unexpected error during validation', error);
    process.exit(1);
  }
}

// Validate database connection and seeding
async function validateDatabase() {
  logSection('Database Validation');
  
  try {
    // Test API connection
    const response = await api.get('/');
    logSuccess('API server is running');
  } catch (error) {
    logError('API server connection failed', error);
    // Exit early if we can't connect to the API
    process.exit(1);
  }
  
  try {
    // Reset and seed the database
    logInfo('Resetting database...');
    await api.post('/seed/reset');
    
    logInfo('Seeding database...');
    const seedResponse = await api.post('/seed/seed');
    
    if (seedResponse.data && seedResponse.data.summary) {
      const summary = seedResponse.data.summary;
      logSuccess('Database seeded successfully');
      logInfo(`Created: ${summary.organizations} organizations, ${summary.users} users, ${summary.suppliers} suppliers`);
      logInfo(`Created: ${summary.products} products, ${summary.nodes} nodes, ${summary.connections} connections`);
      logInfo(`Created: ${summary.grievances} grievances, ${summary.satelliteAlerts} alerts, ${summary.kpis} KPIs`);
      logInfo(`Created: ${summary.surveys} surveys, ${summary.questions} questions, ${summary.responses} responses`);
    } else {
      logWarning('Database seeded but no summary returned');
    }
  } catch (error) {
    logError('Database seeding failed', error);
    // Continue with validation even if seeding fails
  }
}

// Validate authentication
async function validateAuthentication() {
  logSection('Authentication Validation');
  
  try {
    // Test login
    const loginResponse = await api.post('/auth/signin', TEST_CREDENTIALS);
    
    if (loginResponse.data && loginResponse.data.accessToken) {
      authToken = loginResponse.data.accessToken;
      logSuccess('Authentication successful');
      logInfo(`Logged in as: ${loginResponse.data.username} (${loginResponse.data.role})`);
    } else {
      logError('Authentication failed - no token returned');
    }
  } catch (error) {
    logError('Authentication failed', error);
  }
}

// Validate core modules
async function validateCoreModules() {
  logSection('Core Modules Validation');
  
  if (!authToken) {
    logWarning('Skipping core modules validation - not authenticated');
    return;
  }
  
  // Test organizations
  try {
    const orgsResponse = await api.get('/organizations');
    if (orgsResponse.data && Array.isArray(orgsResponse.data) && orgsResponse.data.length > 0) {
      logSuccess('Organizations module working');
    } else {
      logError('Organizations module failed - no data returned');
    }
  } catch (error) {
    logError('Organizations module failed', error);
  }
  
  // Test suppliers
  try {
    const suppliersResponse = await api.get('/suppliers');
    if (suppliersResponse.data && Array.isArray(suppliersResponse.data) && suppliersResponse.data.length > 0) {
      logSuccess('Suppliers module working');
    } else {
      logError('Suppliers module failed - no data returned');
    }
  } catch (error) {
    logError('Suppliers module failed', error);
  }
  
  // Test products
  try {
    const productsResponse = await api.get('/products');
    if (productsResponse.data && Array.isArray(productsResponse.data) && productsResponse.data.length > 0) {
      logSuccess('Products module working');
    } else {
      logError('Products module failed - no data returned');
    }
  } catch (error) {
    logError('Products module failed', error);
  }
  
  // Test supply chain
  try {
    const nodesResponse = await api.get('/supply-chain/nodes');
    if (nodesResponse.data && Array.isArray(nodesResponse.data) && nodesResponse.data.length > 0) {
      logSuccess('Supply Chain module working');
    } else {
      logError('Supply Chain module failed - no data returned');
    }
  } catch (error) {
    logError('Supply Chain module failed', error);
  }
  
  // Test grievances
  try {
    const grievancesResponse = await api.get('/grievances');
    if (grievancesResponse.data && Array.isArray(grievancesResponse.data) && grievancesResponse.data.length > 0) {
      logSuccess('Grievances module working');
    } else {
      logError('Grievances module failed - no data returned');
    }
  } catch (error) {
    logError('Grievances module failed', error);
  }
  
  // Test satellite alerts
  try {
    const alertsResponse = await api.get('/satellite');
    if (alertsResponse.data && Array.isArray(alertsResponse.data) && alertsResponse.data.length > 0) {
      logSuccess('Satellite Monitoring module working');
    } else {
      logError('Satellite Monitoring module failed - no data returned');
    }
  } catch (error) {
    logError('Satellite Monitoring module failed', error);
  }
  
  // Test KPIs
  try {
    const kpisResponse = await api.get('/kpis');
    if (kpisResponse.data && Array.isArray(kpisResponse.data) && kpisResponse.data.length > 0) {
      logSuccess('KPI Dashboard module working');
    } else {
      logError('KPI Dashboard module failed - no data returned');
    }
  } catch (error) {
    logError('KPI Dashboard module failed', error);
  }
  
  // Test surveys
  try {
    const surveysResponse = await api.get('/surveys');
    if (surveysResponse.data && Array.isArray(surveysResponse.data) && surveysResponse.data.length > 0) {
      logSuccess('Supplier Engagement module working');
    } else {
      logError('Supplier Engagement module failed - no data returned');
    }
  } catch (error) {
    logError('Supplier Engagement module failed', error);
  }
  
  // Test admin
  try {
    const adminResponse = await api.get('/admin/dashboard');
    if (adminResponse.data) {
      logSuccess('Admin Console module working');
    } else {
      logError('Admin Console module failed - no data returned');
    }
  } catch (error) {
    logError('Admin Console module failed', error);
  }
}

// Validate cross-module integration
async function validateCrossModuleIntegration() {
  logSection('Cross-Module Integration Validation');
  
  if (!authToken) {
    logWarning('Skipping cross-module validation - not authenticated');
    return;
  }
  
  // Test supplier to grievance relationship
  try {
    const suppliersResponse = await api.get('/suppliers');
    if (suppliersResponse.data && suppliersResponse.data.length > 0) {
      const firstSupplierId = suppliersResponse.data[0].id;
      const grievancesResponse = await api.get(`/grievances/supplier/${firstSupplierId}`);
      
      if (grievancesResponse.data) {
        logSuccess('Supplier-Grievance integration working');
      } else {
        logWarning('Supplier-Grievance integration - no grievances found for supplier');
      }
    } else {
      logWarning('Skipping Supplier-Grievance integration - no suppliers found');
    }
  } catch (error) {
    logError('Supplier-Grievance integration failed', error);
  }
  
  // Test product to supply chain relationship
  try {
    const productsResponse = await api.get('/products');
    if (productsResponse.data && productsResponse.data.length > 0) {
      const firstProductId = productsResponse.data[0].id;
      const nodesResponse = await api.get(`/supply-chain/nodes/product/${firstProductId}`);
      
      if (nodesResponse.data && Array.isArray(nodesResponse.data)) {
        logSuccess('Product-Supply Chain integration working');
      } else {
        logWarning('Product-Supply Chain integration - no nodes found for product');
      }
    } else {
      logWarning('Skipping Product-Supply Chain integration - no products found');
    }
  } catch (error) {
    logError('Product-Supply Chain integration failed', error);
  }
  
  // Test KPI calculation
  try {
    const orgsResponse = await api.get('/organizations');
    if (orgsResponse.data && orgsResponse.data.length > 0) {
      const firstOrgId = orgsResponse.data[0].id;
      const dcfResponse = await api.get(`/kpis/calculate/dcf/${firstOrgId}`);
      
      if (dcfResponse.data && dcfResponse.data.value !== undefined) {
        logSuccess('KPI calculation integration working');
      } else {
        logError('KPI calculation integration - no value returned');
      }
    } else {
      logWarning('Skipping KPI calculation integration - no organizations found');
    }
  } catch (error) {
    logError('KPI calculation integration failed', error);
  }
  
  // Test grievance heatmap
  try {
    const heatmapResponse = await api.get('/grievances/heatmap/data');
    if (heatmapResponse.data) {
      logSuccess('Grievance heatmap integration working');
    } else {
      logError('Grievance heatmap integration - no data returned');
    }
  } catch (error) {
    logError('Grievance heatmap integration failed', error);
  }
}

// Validate user roles and permissions
async function validateUserRoles() {
  logSection('User Roles and Permissions Validation');
  
  if (!authToken) {
    logWarning('Skipping user roles validation - not authenticated');
    return;
  }
  
  // Test admin access to user management
  try {
    const usersResponse = await api.get('/users');
    if (usersResponse.data && Array.isArray(usersResponse.data)) {
      logSuccess('Admin role has access to user management');
    } else {
      logError('Admin role access to user management failed - no data returned');
    }
  } catch (error) {
    logError('Admin role access to user management failed', error);
  }
  
  // Test admin access to system settings
  try {
    const settingsResponse = await api.get('/admin/settings');
    if (settingsResponse.data) {
      logSuccess('Admin role has access to system settings');
    } else {
      logError('Admin role access to system settings failed - no data returned');
    }
  } catch (error) {
    logError('Admin role access to system settings failed', error);
  }
}

// Run the validation
validatePlatform();
