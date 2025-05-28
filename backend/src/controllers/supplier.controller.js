const db = require('../models');
const Supplier = db.supplier;
const Organization = db.organization;

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      include: [{
        model: Organization,
        attributes: ['id', 'name']
      }]
    });
    res.status(200).send(suppliers);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving suppliers."
    });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id, {
      include: [{
        model: Organization,
        attributes: ['id', 'name']
      }]
    });
    
    if (!supplier) {
      return res.status(404).send({
        message: `Supplier with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(supplier);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving supplier."
    });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).send(supplier);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the supplier."
    });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const num = await Supplier.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Supplier was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Supplier with id=${req.params.id}. Maybe Supplier was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating supplier."
    });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const num = await Supplier.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Supplier was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Supplier with id=${req.params.id}. Maybe Supplier was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete supplier."
    });
  }
};

exports.calculateRiskScore = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    
    if (!supplier) {
      return res.status(404).send({
        message: `Supplier with id ${req.params.id} not found.`
      });
    }
    
    // Mock risk calculation algorithm
    // In a real implementation, this would consider factors like:
    // - Region deforestation risk
    // - Previous grievances
    // - Certification status
    // - Compliance history
    
    const regionRisk = Math.random() * 0.4; // 0-0.4 based on region
    const complianceRisk = Math.random() * 0.3; // 0-0.3 based on compliance
    const certificationBonus = supplier.certifications.length * 0.05; // Reduce risk based on certifications
    
    let riskScore = regionRisk + complianceRisk - certificationBonus;
    riskScore = Math.max(0, Math.min(1, riskScore)); // Ensure between 0-1
    
    await Supplier.update({ riskScore }, {
      where: { id: req.params.id }
    });
    
    res.status(200).send({
      id: supplier.id,
      name: supplier.name,
      riskScore,
      riskLevel: riskScore < 0.3 ? 'low' : riskScore < 0.7 ? 'medium' : 'high'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error calculating risk score."
    });
  }
};
