const db = require('../models');
const Grievance = db.grievance;
const Supplier = db.supplier;

exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.findAll({
      include: [{
        model: Supplier,
        attributes: ['id', 'name']
      }]
    });
    res.status(200).send(grievances);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving grievances."
    });
  }
};

exports.getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findByPk(req.params.id, {
      include: [{
        model: Supplier,
        attributes: ['id', 'name']
      }]
    });
    
    if (!grievance) {
      return res.status(404).send({
        message: `Grievance with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(grievance);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving grievance."
    });
  }
};

exports.createGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.create(req.body);
    res.status(201).send(grievance);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the grievance."
    });
  }
};

exports.updateGrievance = async (req, res) => {
  try {
    const num = await Grievance.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Grievance was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Grievance with id=${req.params.id}. Maybe Grievance was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating grievance."
    });
  }
};

exports.deleteGrievance = async (req, res) => {
  try {
    const num = await Grievance.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Grievance was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Grievance with id=${req.params.id}. Maybe Grievance was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete grievance."
    });
  }
};

exports.getGrievancesBySupplier = async (req, res) => {
  try {
    const grievances = await Grievance.findAll({
      where: { supplierId: req.params.supplierId }
    });
    res.status(200).send(grievances);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving grievances for supplier."
    });
  }
};

exports.getGrievanceHeatmap = async (req, res) => {
  try {
    const grievances = await Grievance.findAll({
      attributes: ['coordinates', 'type', 'severity', 'status'],
      where: {
        coordinates: {
          [db.Sequelize.Op.ne]: null
        }
      }
    });
    
    // Transform data for heatmap visualization
    const heatmapData = grievances.map(g => {
      const point = g.coordinates;
      // Weight based on severity
      let weight = 0.3;
      if (g.severity === 'medium') weight = 0.6;
      if (g.severity === 'high') weight = 0.8;
      if (g.severity === 'critical') weight = 1.0;
      
      // Reduce weight if resolved
      if (g.status === 'resolved') weight *= 0.5;
      
      return {
        lat: point.coordinates[1],
        lng: point.coordinates[0],
        weight,
        type: g.type
      };
    });
    
    res.status(200).send(heatmapData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error generating grievance heatmap."
    });
  }
};
