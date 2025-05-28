const db = require('../models');
const KPI = db.kpi;
const Organization = db.organization;

exports.getAllKPIs = async (req, res) => {
  try {
    const kpis = await KPI.findAll({
      include: [{
        model: Organization,
        attributes: ['id', 'name']
      }]
    });
    res.status(200).send(kpis);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving KPIs."
    });
  }
};

exports.getKPIById = async (req, res) => {
  try {
    const kpi = await KPI.findByPk(req.params.id, {
      include: [{
        model: Organization,
        attributes: ['id', 'name']
      }]
    });
    
    if (!kpi) {
      return res.status(404).send({
        message: `KPI with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(kpi);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving KPI."
    });
  }
};

exports.createKPI = async (req, res) => {
  try {
    const kpi = await KPI.create(req.body);
    res.status(201).send(kpi);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the KPI."
    });
  }
};

exports.updateKPI = async (req, res) => {
  try {
    const num = await KPI.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "KPI was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update KPI with id=${req.params.id}. Maybe KPI was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating KPI."
    });
  }
};

exports.deleteKPI = async (req, res) => {
  try {
    const num = await KPI.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "KPI was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete KPI with id=${req.params.id}. Maybe KPI was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete KPI."
    });
  }
};

exports.getKPIsByOrganization = async (req, res) => {
  try {
    const kpis = await KPI.findAll({
      where: { organizationId: req.params.organizationId }
    });
    res.status(200).send(kpis);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving KPIs for organization."
    });
  }
};

exports.getKPIsByCategory = async (req, res) => {
  try {
    const kpis = await KPI.findAll({
      where: { 
        category: req.params.category,
        organizationId: req.query.organizationId
      }
    });
    res.status(200).send(kpis);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving KPIs by category."
    });
  }
};

exports.calculateDCFPercentage = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    
    // In a real implementation, this would query the database
    // to calculate the percentage of verified Deforestation-Conversion-Free suppliers
    // For MVP, we'll return mock data
    
    const mockData = {
      organizationId,
      kpiName: "Verified DCF Percentage",
      value: Math.round(Math.random() * 100),
      target: 100,
      unit: "%",
      date: new Date(),
      trend: Math.random() > 0.5 ? "increasing" : "decreasing",
      status: Math.random() > 0.7 ? "on_track" : Math.random() > 0.4 ? "at_risk" : "off_track"
    };
    
    res.status(200).send(mockData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error calculating DCF percentage."
    });
  }
};

exports.calculateGrievanceResolutionRate = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    
    // In a real implementation, this would query the grievances table
    // to calculate the percentage of resolved grievances
    // For MVP, we'll return mock data
    
    const mockData = {
      organizationId,
      kpiName: "Grievance Resolution Rate",
      value: Math.round(Math.random() * 100),
      target: 90,
      unit: "%",
      date: new Date(),
      trend: Math.random() > 0.5 ? "increasing" : "decreasing",
      status: Math.random() > 0.7 ? "on_track" : Math.random() > 0.4 ? "at_risk" : "off_track"
    };
    
    res.status(200).send(mockData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error calculating grievance resolution rate."
    });
  }
};

exports.calculateSupplierSustainabilityRate = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    
    // In a real implementation, this would query the suppliers table
    // to calculate the percentage of suppliers with sustainability plans
    // For MVP, we'll return mock data
    
    const mockData = {
      organizationId,
      kpiName: "Suppliers with Sustainability Plans",
      value: Math.round(Math.random() * 100),
      target: 80,
      unit: "%",
      date: new Date(),
      trend: Math.random() > 0.5 ? "increasing" : "decreasing",
      status: Math.random() > 0.7 ? "on_track" : Math.random() > 0.4 ? "at_risk" : "off_track"
    };
    
    res.status(200).send(mockData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error calculating supplier sustainability rate."
    });
  }
};
