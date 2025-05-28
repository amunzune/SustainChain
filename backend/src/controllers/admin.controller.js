const db = require('../models');
const User = db.user;
const Organization = db.organization;

exports.getAdminDashboard = async (req, res) => {
  try {
    // Get counts for dashboard
    const userCount = await User.count();
    const organizationCount = await Organization.count();
    const supplierCount = await db.supplier.count();
    const productCount = await db.product.count();
    const grievanceCount = await db.grievance.count();
    const openGrievanceCount = await db.grievance.count({
      where: {
        status: {
          [db.Sequelize.Op.ne]: 'resolved'
        }
      }
    });
    
    res.status(200).send({
      userCount,
      organizationCount,
      supplierCount,
      productCount,
      grievanceCount,
      openGrievanceCount
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving admin dashboard data."
    });
  }
};

exports.getUserRoles = async (req, res) => {
  try {
    const roles = ['admin', 'analyst', 'supplier', 'partner'];
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving user roles."
    });
  }
};

exports.getSystemSettings = async (req, res) => {
  try {
    // Mock system settings
    const settings = {
      apiEndpoints: {
        salesforce: process.env.SALESFORCE_API || 'https://api.example.com/salesforce',
        sap: process.env.SAP_API || 'https://api.example.com/sap',
        carbonAccounting: process.env.CARBON_API || 'https://api.example.com/carbon'
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: false,
        alertFrequency: 'daily'
      },
      security: {
        mfaEnabled: true,
        sessionTimeout: 30, // minutes
        passwordPolicy: 'strong'
      },
      dataRetention: {
        grievances: 365, // days
        surveys: 730, // days
        auditLogs: 90 // days
      }
    };
    
    res.status(200).send(settings);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving system settings."
    });
  }
};

exports.updateSystemSettings = async (req, res) => {
  try {
    // In a real implementation, this would update settings in a database
    // For MVP, we'll just return success
    res.status(200).send({
      message: "System settings updated successfully.",
      settings: req.body
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating system settings."
    });
  }
};

exports.getApiConfiguration = async (req, res) => {
  try {
    // Mock API configuration
    const apiConfig = {
      availableApis: [
        {
          name: 'Salesforce',
          endpoint: process.env.SALESFORCE_API || 'https://api.example.com/salesforce',
          status: 'active',
          authType: 'oauth2'
        },
        {
          name: 'SAP',
          endpoint: process.env.SAP_API || 'https://api.example.com/sap',
          status: 'inactive',
          authType: 'apikey'
        },
        {
          name: 'Carbon Accounting',
          endpoint: process.env.CARBON_API || 'https://api.example.com/carbon',
          status: 'active',
          authType: 'oauth2'
        }
      ]
    };
    
    res.status(200).send(apiConfig);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving API configuration."
    });
  }
};

exports.updateApiConfiguration = async (req, res) => {
  try {
    // In a real implementation, this would update API config in a database
    // For MVP, we'll just return success
    res.status(200).send({
      message: "API configuration updated successfully.",
      config: req.body
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating API configuration."
    });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    // Mock audit logs
    const logs = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000),
        user: 'admin@example.com',
        action: 'LOGIN',
        details: 'Successful login',
        ip: '192.168.1.1'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000),
        user: 'analyst@example.com',
        action: 'CREATE',
        details: 'Created new supplier',
        ip: '192.168.1.2'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 86400000),
        user: 'admin@example.com',
        action: 'UPDATE',
        details: 'Updated system settings',
        ip: '192.168.1.1'
      }
    ];
    
    res.status(200).send(logs);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving audit logs."
    });
  }
};
