const express = require('express');
const router = express.Router();
const seedData = require('../utils/seedData');

// Route to seed the database
router.post('/seed', async (req, res) => {
  try {
    const result = await seedData();
    res.status(200).send({
      message: 'Database seeded successfully',
      summary: {
        organizations: result.organizations.length,
        users: result.users.length,
        suppliers: result.suppliers.length,
        products: result.products.length,
        nodes: result.nodes.length,
        connections: result.connections.length,
        grievances: result.grievances.length,
        satelliteAlerts: result.satelliteAlerts.length,
        kpis: result.kpis.length,
        surveys: result.surveys.length,
        questions: result.questions1.length + result.questions2.length,
        responses: result.responses.length
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error seeding database',
      error: error.message
    });
  }
});

// Route to reset the database (for development purposes only)
router.post('/reset', async (req, res) => {
  try {
    const db = require('../models');
    await db.sequelize.sync({ force: true });
    res.status(200).send({
      message: 'Database reset successfully'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error resetting database',
      error: error.message
    });
  }
});

module.exports = router;
