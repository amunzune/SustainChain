const db = require('../models');
const Organization = db.organization;

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).send(organizations);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving organizations."
    });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    
    if (!organization) {
      return res.status(404).send({
        message: `Organization with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(organization);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving organization."
    });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).send(organization);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the organization."
    });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const num = await Organization.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Organization was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Organization with id=${req.params.id}. Maybe Organization was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating organization."
    });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const num = await Organization.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Organization was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Organization with id=${req.params.id}. Maybe Organization was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete organization."
    });
  }
};
