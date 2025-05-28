const db = require('../models');
const SatelliteAlert = db.satelliteAlert;

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await SatelliteAlert.findAll();
    res.status(200).send(alerts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving satellite alerts."
    });
  }
};

exports.getAlertById = async (req, res) => {
  try {
    const alert = await SatelliteAlert.findByPk(req.params.id);
    
    if (!alert) {
      return res.status(404).send({
        message: `Satellite alert with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(alert);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving satellite alert."
    });
  }
};

exports.createAlert = async (req, res) => {
  try {
    const alert = await SatelliteAlert.create(req.body);
    res.status(201).send(alert);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the satellite alert."
    });
  }
};

exports.updateAlert = async (req, res) => {
  try {
    const num = await SatelliteAlert.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Satellite alert was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Satellite alert with id=${req.params.id}. Maybe alert was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating satellite alert."
    });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const num = await SatelliteAlert.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Satellite alert was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Satellite alert with id=${req.params.id}. Maybe alert was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete satellite alert."
    });
  }
};

exports.getAlertsByRegion = async (req, res) => {
  try {
    const alerts = await SatelliteAlert.findAll({
      where: { region: req.params.region }
    });
    res.status(200).send(alerts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving alerts for region."
    });
  }
};

// Mock function to generate random alerts
exports.generateMockAlerts = async (req, res) => {
  try {
    const { count = 5, region } = req.body;
    const alertTypes = ['deforestation', 'fire', 'landcover_change', 'other'];
    const severities = ['low', 'medium', 'high', 'critical'];
    const statuses = ['new', 'investigating', 'confirmed', 'false_positive'];
    
    const mockAlerts = [];
    
    for (let i = 0; i < count; i++) {
      // Generate random coordinates within the specified region or default range
      let lat, lng;
      
      if (region === 'southeast_asia') {
        // Southeast Asia approximate bounds
        lat = 0 + Math.random() * 20; // 0 to 20 N
        lng = 95 + Math.random() * 30; // 95 to 125 E
      } else if (region === 'amazon') {
        // Amazon approximate bounds
        lat = -15 + Math.random() * 15; // -15 to 0 N
        lng = -75 + Math.random() * 15; // -75 to -60 W
      } else if (region === 'congo_basin') {
        // Congo Basin approximate bounds
        lat = -5 + Math.random() * 10; // -5 to 5 N
        lng = 10 + Math.random() * 20; // 10 to 30 E
      } else {
        // Default: random global coordinates
        lat = -90 + Math.random() * 180; // -90 to 90
        lng = -180 + Math.random() * 360; // -180 to 180
      }
      
      const alert = await SatelliteAlert.create({
        alertDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date in last 30 days
        coordinates: { type: 'Point', coordinates: [lng, lat] },
        region: region || 'global',
        country: region === 'southeast_asia' ? 'Indonesia' : 
                 region === 'amazon' ? 'Brazil' : 
                 region === 'congo_basin' ? 'Democratic Republic of Congo' : 'Unknown',
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        area: Math.random() * 100, // 0-100 hectares
        confidence: 0.5 + Math.random() * 0.5, // 0.5-1.0 confidence
        source: Math.random() > 0.5 ? 'sentinel' : 'planet',
        imageUrl: `https://example.com/satellite-images/${Math.floor(Math.random() * 1000)}.jpg`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        notes: 'This is a mock alert generated for demonstration purposes.'
      });
      
      mockAlerts.push(alert);
    }
    
    res.status(201).send({
      message: `Successfully generated ${mockAlerts.length} mock alerts.`,
      alerts: mockAlerts
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error generating mock satellite alerts."
    });
  }
};
