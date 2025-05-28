const db = require('../models');
const SupplyChainNode = db.supplyChainNode;
const Connection = db.connection;
const Product = db.product;

exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await SupplyChainNode.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'name']
      }]
    });
    res.status(200).send(nodes);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving supply chain nodes."
    });
  }
};

exports.getNodeById = async (req, res) => {
  try {
    const node = await SupplyChainNode.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'name']
      }]
    });
    
    if (!node) {
      return res.status(404).send({
        message: `Supply chain node with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(node);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving supply chain node."
    });
  }
};

exports.createNode = async (req, res) => {
  try {
    const node = await SupplyChainNode.create(req.body);
    res.status(201).send(node);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the supply chain node."
    });
  }
};

exports.updateNode = async (req, res) => {
  try {
    const num = await SupplyChainNode.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Supply chain node was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update supply chain node with id=${req.params.id}. Maybe node was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating supply chain node."
    });
  }
};

exports.deleteNode = async (req, res) => {
  try {
    const num = await SupplyChainNode.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Supply chain node was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete supply chain node with id=${req.params.id}. Maybe node was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete supply chain node."
    });
  }
};

exports.getNodesByProduct = async (req, res) => {
  try {
    const nodes = await SupplyChainNode.findAll({
      where: { productId: req.params.productId }
    });
    res.status(200).send(nodes);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving nodes for product."
    });
  }
};

exports.getAllConnections = async (req, res) => {
  try {
    const connections = await Connection.findAll({
      include: [
        {
          model: SupplyChainNode,
          as: 'source',
          attributes: ['id', 'name', 'type', 'coordinates']
        },
        {
          model: SupplyChainNode,
          as: 'target',
          attributes: ['id', 'name', 'type', 'coordinates']
        }
      ]
    });
    res.status(200).send(connections);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving connections."
    });
  }
};

exports.createConnection = async (req, res) => {
  try {
    const connection = await Connection.create(req.body);
    res.status(201).send(connection);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the connection."
    });
  }
};

exports.getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findByPk(req.params.id, {
      include: [
        {
          model: SupplyChainNode,
          as: 'source',
          attributes: ['id', 'name', 'type', 'coordinates']
        },
        {
          model: SupplyChainNode,
          as: 'target',
          attributes: ['id', 'name', 'type', 'coordinates']
        }
      ]
    });
    
    if (!connection) {
      return res.status(404).send({
        message: `Connection with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving connection."
    });
  }
};

exports.updateConnection = async (req, res) => {
  try {
    const num = await Connection.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Connection was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Connection with id=${req.params.id}. Maybe Connection was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating connection."
    });
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const num = await Connection.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Connection was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Connection with id=${req.params.id}. Maybe Connection was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete connection."
    });
  }
};

exports.getSupplyChainMap = async (req, res) => {
  try {
    // Get all nodes and connections for a complete supply chain map
    const nodes = await SupplyChainNode.findAll({
      attributes: ['id', 'name', 'type', 'coordinates', 'riskLevel', 'country', 'region']
    });
    
    const connections = await Connection.findAll({
      attributes: ['id', 'sourceId', 'targetId', 'type', 'transportMethod', 'isVerified']
    });
    
    // Transform data for frontend visualization
    const mapData = {
      nodes: nodes.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        coordinates: node.coordinates,
        riskLevel: node.riskLevel,
        country: node.country,
        region: node.region
      })),
      connections: connections.map(conn => ({
        id: conn.id,
        source: conn.sourceId,
        target: conn.targetId,
        type: conn.type,
        transportMethod: conn.transportMethod,
        isVerified: conn.isVerified
      }))
    };
    
    res.status(200).send(mapData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error generating supply chain map."
    });
  }
};

exports.importSupplyChainData = async (req, res) => {
  try {
    const { productId, data } = req.body;
    
    // Validate product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({
        message: `Product with id ${productId} not found.`
      });
    }
    
    // Process data (assuming JSON format)
    // In a real implementation, this would parse CSV or JSON data
    // and create nodes and connections accordingly
    
    const createdNodes = [];
    const createdConnections = [];
    
    // Create nodes
    if (data.nodes && Array.isArray(data.nodes)) {
      for (const nodeData of data.nodes) {
        const node = await SupplyChainNode.create({
          ...nodeData,
          productId
        });
        createdNodes.push(node);
      }
    }
    
    // Create connections
    if (data.connections && Array.isArray(data.connections)) {
      for (const connData of data.connections) {
        const connection = await Connection.create(connData);
        createdConnections.push(connection);
      }
    }
    
    res.status(201).send({
      message: `Successfully imported supply chain data with ${createdNodes.length} nodes and ${createdConnections.length} connections.`,
      nodes: createdNodes,
      connections: createdConnections
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error importing supply chain data."
    });
  }
};
