const db = require('../models');
const Product = db.product;
const Supplier = db.supplier;

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Supplier,
        attributes: ['id', 'name']
      }]
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving products."
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Supplier,
        attributes: ['id', 'name']
      }]
    });
    
    if (!product) {
      return res.status(404).send({
        message: `Product with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving product."
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the product."
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const num = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Product was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Product with id=${req.params.id}. Maybe Product was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating product."
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const num = await Product.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Product was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete product."
    });
  }
};

exports.getProductsBySupplier = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { supplierId: req.params.supplierId }
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving products for supplier."
    });
  }
};

exports.verifyProduct = async (req, res) => {
  try {
    const { isDeforestationFree, verificationMethod } = req.body;
    
    const product = await Product.update({
      isDeforestationFree,
      isVerified: true,
      verificationDate: new Date(),
      verificationMethod
    }, {
      where: { id: req.params.id }
    });
    
    if (product) {
      res.status(200).send({
        message: "Product verification status updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update verification status for Product with id=${req.params.id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating product verification status."
    });
  }
};
