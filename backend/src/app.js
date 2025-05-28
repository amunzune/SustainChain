// Update app.js to include the seed routes
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const organizationRoutes = require('./routes/organization.routes');
const supplierRoutes = require('./routes/supplier.routes');
const productRoutes = require('./routes/product.routes');
const supplyChainRoutes = require('./routes/supplyChain.routes');
const grievanceRoutes = require('./routes/grievance.routes');
const satelliteRoutes = require('./routes/satellite.routes');
const kpiRoutes = require('./routes/kpi.routes');
const surveyRoutes = require('./routes/survey.routes');
const adminRoutes = require('./routes/admin.routes');
const seedRoutes = require('./routes/seed.routes'); // Add seed routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SustainChain Navigator API.' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/supply-chain', supplyChainRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/satellite', satelliteRoutes);
app.use('/api/kpis', kpiRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seed', seedRoutes); // Add seed routes

// Database setup
const db = require('./models');

// Sync database
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

// Set port and start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
