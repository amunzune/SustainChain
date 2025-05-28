const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;
const Organization = db.organization;
const Supplier = db.supplier;
const Product = db.product;
const SupplyChainNode = db.supplyChainNode;
const Connection = db.connection;
const Grievance = db.grievance;
const SatelliteAlert = db.satelliteAlert;
const KPI = db.kpi;
const Survey = db.survey;
const Question = db.question;
const Response = db.response;

// Seed data function
const seedData = async () => {
  try {
    console.log('Starting to seed database...');

    // Create organizations
    const organizations = await Organization.bulkCreate([
      {
        name: 'EcoForest Industries',
        type: 'brand',
        country: 'United States',
        address: '123 Green St, Portland, OR 97201',
        contactEmail: 'contact@ecoforest.example',
        contactPhone: '+1-555-123-4567',
        website: 'https://ecoforest.example',
        isActive: true
      },
      {
        name: 'Sustainable Wood Co.',
        type: 'supplier',
        country: 'Brazil',
        address: '456 Amazon Ave, Manaus, Brazil',
        contactEmail: 'info@sustainablewood.example',
        contactPhone: '+55-123-456-7890',
        website: 'https://sustainablewood.example',
        isActive: true
      },
      {
        name: 'Forest Guardians NGO',
        type: 'ngo',
        country: 'Switzerland',
        address: '789 Conservation Blvd, Geneva, Switzerland',
        contactEmail: 'info@forestguardians.example',
        contactPhone: '+41-22-123-4567',
        website: 'https://forestguardians.example',
        isActive: true
      }
    ]);

    console.log('Organizations created successfully');

    // Create users
    const users = await User.bulkCreate([
      {
        username: 'admin',
        email: 'admin@sustainchain.example',
        password: bcrypt.hashSync('password123', 8),
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        organizationId: organizations[0].id,
        isActive: true
      },
      {
        username: 'analyst',
        email: 'analyst@sustainchain.example',
        password: bcrypt.hashSync('password123', 8),
        role: 'analyst',
        firstName: 'Analyst',
        lastName: 'User',
        organizationId: organizations[0].id,
        isActive: true
      },
      {
        username: 'supplier',
        email: 'supplier@sustainchain.example',
        password: bcrypt.hashSync('password123', 8),
        role: 'supplier',
        firstName: 'Supplier',
        lastName: 'User',
        organizationId: organizations[1].id,
        isActive: true
      },
      {
        username: 'partner',
        email: 'partner@sustainchain.example',
        password: bcrypt.hashSync('password123', 8),
        role: 'partner',
        firstName: 'Partner',
        lastName: 'User',
        organizationId: organizations[2].id,
        isActive: true
      }
    ]);

    console.log('Users created successfully');

    // Create suppliers
    const suppliers = await Supplier.bulkCreate([
      {
        name: 'Amazon Timber Cooperative',
        type: 'producer',
        country: 'Brazil',
        region: 'Amazon',
        coordinates: { type: 'Point', coordinates: [-59.9833, -3.1190] },
        contactPerson: 'Maria Silva',
        contactEmail: 'maria@amazontimber.example',
        contactPhone: '+55-123-456-7890',
        certifications: ['FSC', 'PEFC'],
        riskScore: 0.3,
        hasSustainabilityPlan: true,
        organizationId: organizations[1].id,
        isActive: true
      },
      {
        name: 'Indonesian Forest Products',
        type: 'producer',
        country: 'Indonesia',
        region: 'Sumatra',
        coordinates: { type: 'Point', coordinates: [98.6722, 3.5952] },
        contactPerson: 'Budi Santoso',
        contactEmail: 'budi@indonesianforest.example',
        contactPhone: '+62-812-3456-7890',
        certifications: ['FSC'],
        riskScore: 0.7,
        hasSustainabilityPlan: false,
        organizationId: organizations[1].id,
        isActive: true
      },
      {
        name: 'Nordic Timber Processing',
        type: 'processor',
        country: 'Sweden',
        region: 'Norrland',
        coordinates: { type: 'Point', coordinates: [18.0686, 59.3293] },
        contactPerson: 'Erik Johansson',
        contactEmail: 'erik@nordictimber.example',
        contactPhone: '+46-70-123-4567',
        certifications: ['FSC', 'PEFC', 'ISO14001'],
        riskScore: 0.1,
        hasSustainabilityPlan: true,
        organizationId: organizations[1].id,
        isActive: true
      },
      {
        name: 'Pacific Lumber Mills',
        type: 'manufacturer',
        country: 'United States',
        region: 'Pacific Northwest',
        coordinates: { type: 'Point', coordinates: [-122.6765, 45.5231] },
        contactPerson: 'John Smith',
        contactEmail: 'john@pacificlumber.example',
        contactPhone: '+1-503-123-4567',
        certifications: ['FSC', 'SFI'],
        riskScore: 0.2,
        hasSustainabilityPlan: true,
        organizationId: organizations[0].id,
        isActive: true
      },
      {
        name: 'Global Wood Distributors',
        type: 'distributor',
        country: 'Netherlands',
        region: 'Rotterdam',
        coordinates: { type: 'Point', coordinates: [4.4777, 51.9244] },
        contactPerson: 'Pieter van der Berg',
        contactEmail: 'pieter@globalwood.example',
        contactPhone: '+31-10-123-4567',
        certifications: ['FSC'],
        riskScore: 0.4,
        hasSustainabilityPlan: true,
        organizationId: organizations[0].id,
        isActive: true
      }
    ]);

    console.log('Suppliers created successfully');

    // Create products
    const products = await Product.bulkCreate([
      {
        name: 'Sustainable Hardwood Flooring',
        category: 'Flooring',
        description: 'Premium hardwood flooring from certified sustainable sources',
        certifications: ['FSC', 'CARB2'],
        isDeforestationFree: true,
        isVerified: true,
        verificationDate: new Date(),
        verificationMethod: 'Third-party audit',
        supplierId: suppliers[0].id,
        isActive: true
      },
      {
        name: 'Eco-Friendly Plywood',
        category: 'Construction Materials',
        description: 'Plywood manufactured with low-emission adhesives and sustainable timber',
        certifications: ['FSC', 'CARB2', 'GreenGuard'],
        isDeforestationFree: true,
        isVerified: true,
        verificationDate: new Date(),
        verificationMethod: 'Third-party audit',
        supplierId: suppliers[1].id,
        isActive: true
      },
      {
        name: 'Reclaimed Wood Furniture',
        category: 'Furniture',
        description: 'Furniture made from reclaimed and recycled wood sources',
        certifications: ['FSC Recycled'],
        isDeforestationFree: true,
        isVerified: true,
        verificationDate: new Date(),
        verificationMethod: 'Chain of custody verification',
        supplierId: suppliers[2].id,
        isActive: true
      },
      {
        name: 'Timber Decking',
        category: 'Outdoor',
        description: 'Weather-resistant timber decking for outdoor applications',
        certifications: ['FSC', 'PEFC'],
        isDeforestationFree: false,
        isVerified: false,
        supplierId: suppliers[3].id,
        isActive: true
      },
      {
        name: 'Wood Pulp',
        category: 'Raw Materials',
        description: 'Processed wood pulp for paper and packaging production',
        certifications: ['FSC'],
        isDeforestationFree: true,
        isVerified: false,
        supplierId: suppliers[4].id,
        isActive: true
      }
    ]);

    console.log('Products created successfully');

    // Create supply chain nodes
    const nodes = await SupplyChainNode.bulkCreate([
      {
        name: 'Amazon Forest Harvest Site',
        type: 'source',
        country: 'Brazil',
        region: 'Amazon',
        coordinates: { type: 'Point', coordinates: [-59.9833, -3.1190] },
        address: 'Rural Zone, Manaus, Brazil',
        contactPerson: 'Maria Silva',
        contactEmail: 'maria@amazontimber.example',
        contactPhone: '+55-123-456-7890',
        riskLevel: 'medium',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'Manaus Processing Facility',
        type: 'processing',
        country: 'Brazil',
        region: 'Amazon',
        coordinates: { type: 'Point', coordinates: [-60.0217, -3.1064] },
        address: 'Industrial District, Manaus, Brazil',
        contactPerson: 'Carlos Oliveira',
        contactEmail: 'carlos@amazontimber.example',
        contactPhone: '+55-123-456-7891',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'Santos Port Export Terminal',
        type: 'distribution',
        country: 'Brazil',
        region: 'São Paulo',
        coordinates: { type: 'Point', coordinates: [-46.3333, -23.9500] },
        address: 'Port Area, Santos, Brazil',
        contactPerson: 'Paulo Mendes',
        contactEmail: 'paulo@santosport.example',
        contactPhone: '+55-123-456-7892',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'Rotterdam Import Terminal',
        type: 'distribution',
        country: 'Netherlands',
        region: 'Rotterdam',
        coordinates: { type: 'Point', coordinates: [4.4777, 51.9244] },
        address: 'Port of Rotterdam, Netherlands',
        contactPerson: 'Pieter van der Berg',
        contactEmail: 'pieter@rotterdamport.example',
        contactPhone: '+31-10-123-4567',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'Portland Manufacturing Facility',
        type: 'manufacturing',
        country: 'United States',
        region: 'Oregon',
        coordinates: { type: 'Point', coordinates: [-122.6765, 45.5231] },
        address: '123 Industrial Way, Portland, OR, USA',
        contactPerson: 'John Smith',
        contactEmail: 'john@ecoforest.example',
        contactPhone: '+1-503-123-4567',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'US Distribution Center',
        type: 'distribution',
        country: 'United States',
        region: 'Oregon',
        coordinates: { type: 'Point', coordinates: [-122.6500, 45.5300] },
        address: '456 Logistics Ave, Portland, OR, USA',
        contactPerson: 'Sarah Johnson',
        contactEmail: 'sarah@ecoforest.example',
        contactPhone: '+1-503-123-4568',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      },
      {
        name: 'Retail Outlet West',
        type: 'retail',
        country: 'United States',
        region: 'California',
        coordinates: { type: 'Point', coordinates: [-118.2437, 34.0522] },
        address: '789 Retail Blvd, Los Angeles, CA, USA',
        contactPerson: 'Michael Brown',
        contactEmail: 'michael@ecoforest.example',
        contactPhone: '+1-213-123-4567',
        riskLevel: 'low',
        productId: products[0].id,
        isActive: true
      }
    ]);

    console.log('Supply chain nodes created successfully');

    // Create connections
    const connections = await Connection.bulkCreate([
      {
        sourceId: nodes[0].id,
        targetId: nodes[1].id,
        type: 'direct',
        transportMethod: 'Truck',
        distance: 25.5,
        carbonFootprint: 2.3,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      },
      {
        sourceId: nodes[1].id,
        targetId: nodes[2].id,
        type: 'direct',
        transportMethod: 'Truck',
        distance: 2700,
        carbonFootprint: 243,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      },
      {
        sourceId: nodes[2].id,
        targetId: nodes[3].id,
        type: 'direct',
        transportMethod: 'Ship',
        distance: 10200,
        carbonFootprint: 306,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      },
      {
        sourceId: nodes[3].id,
        targetId: nodes[4].id,
        type: 'direct',
        transportMethod: 'Ship',
        distance: 8700,
        carbonFootprint: 261,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      },
      {
        sourceId: nodes[4].id,
        targetId: nodes[5].id,
        type: 'direct',
        transportMethod: 'Truck',
        distance: 5.3,
        carbonFootprint: 0.48,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      },
      {
        sourceId: nodes[5].id,
        targetId: nodes[6].id,
        type: 'direct',
        transportMethod: 'Truck',
        distance: 1450,
        carbonFootprint: 130.5,
        isVerified: true,
        verificationDate: new Date(),
        isActive: true
      }
    ]);

    console.log('Connections created successfully');

    // Create grievances
    const grievances = await Grievance.bulkCreate([
      {
        title: 'Deforestation beyond permitted area',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        source: 'Local community report',
        type: 'deforestation',
        description: 'Logging activities observed outside of the permitted harvest area, affecting primary forest.',
        location: 'Northwest sector of Amazon Timber Cooperative concession',
        coordinates: { type: 'Point', coordinates: [-60.0500, -3.1000] },
        status: 'under_investigation',
        severity: 'high',
        supplierId: suppliers[0].id
      },
      {
        title: 'Labor rights violation',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        source: 'Worker complaint',
        type: 'labor',
        description: 'Reports of excessive working hours and unsafe working conditions at processing facility.',
        location: 'Indonesian Forest Products main facility',
        coordinates: { type: 'Point', coordinates: [98.6722, 3.5952] },
        status: 'resolved',
        severity: 'medium',
        resolutionNotes: 'Company implemented new safety protocols and adjusted work schedules. Third-party audit confirmed compliance.',
        resolutionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        supplierId: suppliers[1].id
      },
      {
        title: 'Land rights dispute',
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        source: 'Indigenous community',
        type: 'land_rights',
        description: 'Indigenous community claims traditional rights to land being harvested by supplier.',
        location: 'Eastern border of Amazon Timber Cooperative concession',
        coordinates: { type: 'Point', coordinates: [-59.9000, -3.1200] },
        status: 'under_investigation',
        severity: 'critical',
        supplierId: suppliers[0].id
      },
      {
        title: 'Water pollution incident',
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        source: 'Environmental NGO',
        type: 'other',
        description: 'Chemical runoff from processing facility affecting local water sources.',
        location: 'Stream adjacent to Pacific Lumber Mills',
        coordinates: { type: 'Point', coordinates: [-122.6800, 45.5200] },
        status: 'reported',
        severity: 'medium',
        supplierId: suppliers[3].id
      },
      {
        title: 'Unauthorized road construction',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        source: 'Satellite monitoring',
        type: 'deforestation',
        description: 'New road construction detected in high conservation value forest area.',
        location: 'Southern region of Indonesian Forest Products concession',
        coordinates: { type: 'Point', coordinates: [98.7000, 3.5800] },
        status: 'reported',
        severity: 'high',
        supplierId: suppliers[1].id
      }
    ]);

    console.log('Grievances created successfully');

    // Create satellite alerts
    const satelliteAlerts = await SatelliteAlert.bulkCreate([
      {
        alertDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        coordinates: { type: 'Point', coordinates: [-60.0500, -3.1000] },
        region: 'amazon',
        country: 'Brazil',
        type: 'deforestation',
        severity: 'high',
        area: 5.7,
        confidence: 0.85,
        source: 'sentinel',
        imageUrl: 'https://example.com/satellite-images/alert1.jpg',
        status: 'new',
        notes: 'Clear cutting detected at the edge of a previously intact forest area.'
      },
      {
        alertDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        coordinates: { type: 'Point', coordinates: [98.7000, 3.5800] },
        region: 'southeast_asia',
        country: 'Indonesia',
        type: 'deforestation',
        severity: 'critical',
        area: 12.3,
        confidence: 0.92,
        source: 'planet',
        imageUrl: 'https://example.com/satellite-images/alert2.jpg',
        status: 'investigating',
        notes: 'Large-scale forest clearing detected, possibly for plantation expansion.'
      },
      {
        alertDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        coordinates: { type: 'Point', coordinates: [-59.9000, -3.1200] },
        region: 'amazon',
        country: 'Brazil',
        type: 'fire',
        severity: 'medium',
        area: 3.2,
        confidence: 0.78,
        source: 'sentinel',
        imageUrl: 'https://example.com/satellite-images/alert3.jpg',
        status: 'confirmed',
        notes: 'Hotspots detected consistent with controlled burning practices.'
      },
      {
        alertDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        coordinates: { type: 'Point', coordinates: [15.2663, -4.4419] },
        region: 'congo_basin',
        country: 'Democratic Republic of Congo',
        type: 'landcover_change',
        severity: 'low',
        area: 1.8,
        confidence: 0.65,
        source: 'sentinel',
        imageUrl: 'https://example.com/satellite-images/alert4.jpg',
        status: 'false_positive',
        notes: 'Initial alert triggered by seasonal changes in vegetation, not actual deforestation.'
      },
      {
        alertDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        coordinates: { type: 'Point', coordinates: [98.6800, 3.6000] },
        region: 'southeast_asia',
        country: 'Indonesia',
        type: 'deforestation',
        severity: 'high',
        area: 4.5,
        confidence: 0.88,
        source: 'planet',
        imageUrl: 'https://example.com/satellite-images/alert5.jpg',
        status: 'new',
        notes: 'New road construction detected leading into primary forest area.'
      }
    ]);

    console.log('Satellite alerts created successfully');

    // Create KPIs
    const kpis = await KPI.bulkCreate([
      {
        name: 'Verified DCF Percentage',
        category: 'environmental',
        description: 'Percentage of supply chain verified as Deforestation-Conversion-Free',
        value: 72.5,
        target: 100,
        unit: '%',
        date: new Date(),
        period: 'quarterly',
        trend: 'increasing',
        status: 'on_track',
        dataSource: 'Supply chain verification audits',
        organizationId: organizations[0].id
      },
      {
        name: 'Grievance Resolution Rate',
        category: 'social',
        description: 'Percentage of grievances that have been resolved',
        value: 65.0,
        target: 90,
        unit: '%',
        date: new Date(),
        period: 'monthly',
        trend: 'increasing',
        status: 'at_risk',
        dataSource: 'Grievance management system',
        organizationId: organizations[0].id
      },
      {
        name: 'Suppliers with Sustainability Plans',
        category: 'governance',
        description: 'Percentage of suppliers with formal sustainability plans',
        value: 80.0,
        target: 100,
        unit: '%',
        date: new Date(),
        period: 'quarterly',
        trend: 'stable',
        status: 'on_track',
        dataSource: 'Supplier documentation',
        organizationId: organizations[0].id
      },
      {
        name: 'Carbon Footprint',
        category: 'environmental',
        description: 'Total carbon emissions from supply chain operations',
        value: 12500,
        target: 10000,
        unit: 'tCO2e',
        date: new Date(),
        period: 'yearly',
        trend: 'decreasing',
        status: 'at_risk',
        dataSource: 'Carbon accounting system',
        organizationId: organizations[0].id
      },
      {
        name: 'Certification Coverage',
        category: 'environmental',
        description: 'Percentage of products covered by sustainability certifications',
        value: 85.0,
        target: 95,
        unit: '%',
        date: new Date(),
        period: 'quarterly',
        trend: 'increasing',
        status: 'on_track',
        dataSource: 'Product database',
        organizationId: organizations[0].id
      }
    ]);

    console.log('KPIs created successfully');

    // Create surveys
    const surveys = await Survey.bulkCreate([
      {
        title: 'Annual Supplier Sustainability Assessment',
        description: 'Comprehensive assessment of supplier sustainability practices and performance',
        status: 'active',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        targetAudience: 'all_suppliers',
        responseRate: 0.45,
        isRequired: true,
        reminderFrequency: 'biweekly',
        organizationId: organizations[0].id
      },
      {
        title: 'Deforestation Risk Assessment',
        description: 'Focused assessment of deforestation risks in supplier operations',
        status: 'active',
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        targetAudience: 'high_risk_suppliers',
        responseRate: 0.60,
        isRequired: true,
        reminderFrequency: 'weekly',
        organizationId: organizations[0].id
      },
      {
        title: 'Supplier Engagement Feedback',
        description: 'Survey to gather feedback on supplier engagement program effectiveness',
        status: 'draft',
        targetAudience: 'all_suppliers',
        responseRate: 0.0,
        isRequired: false,
        reminderFrequency: 'none',
        organizationId: organizations[0].id
      }
    ]);

    console.log('Surveys created successfully');

    // Create questions for the first survey
    const questions1 = await Question.bulkCreate([
      {
        text: 'Does your organization have a formal sustainability policy?',
        type: 'boolean',
        required: true,
        order: 0,
        helpText: 'A formal policy should be documented and approved by senior management',
        surveyId: surveys[0].id
      },
      {
        text: 'What sustainability certifications does your organization currently hold?',
        type: 'multiple_choice',
        options: ['FSC', 'PEFC', 'SFI', 'ISO 14001', 'Other', 'None'],
        required: true,
        order: 1,
        helpText: 'Select all that apply',
        surveyId: surveys[0].id
      },
      {
        text: 'How do you monitor and prevent deforestation in your supply areas?',
        type: 'text',
        required: true,
        order: 2,
        helpText: 'Please describe your monitoring systems and procedures',
        surveyId: surveys[0].id
      },
      {
        text: 'What percentage of your supply chain can be traced to the forest of origin?',
        type: 'number',
        required: true,
        order: 3,
        helpText: 'Enter a number between 0 and 100',
        validation: { min: 0, max: 100 },
        surveyId: surveys[0].id
      },
      {
        text: 'Please upload your latest sustainability report',
        type: 'file_upload',
        required: false,
        order: 4,
        helpText: 'Accepted formats: PDF, DOCX, XLSX',
        surveyId: surveys[0].id
      }
    ]);

    // Create questions for the second survey
    const questions2 = await Question.bulkCreate([
      {
        text: 'Are any of your sourcing areas located in regions with high deforestation risk?',
        type: 'boolean',
        required: true,
        order: 0,
        helpText: 'High-risk regions include the Amazon, Congo Basin, and Southeast Asian tropical forests',
        surveyId: surveys[1].id
      },
      {
        text: 'What methods do you use to verify that your products are deforestation-free?',
        type: 'multiple_choice',
        options: ['Satellite monitoring', 'Third-party verification', 'Field audits', 'Supplier declarations', 'Other', 'None'],
        required: true,
        order: 1,
        helpText: 'Select all that apply',
        surveyId: surveys[1].id
      },
      {
        text: 'Please provide the coordinates of your harvesting areas',
        type: 'text',
        required: true,
        order: 2,
        helpText: 'Format: latitude, longitude for each area, separated by semicolons',
        surveyId: surveys[1].id
      },
      {
        text: 'When was your last deforestation risk assessment conducted?',
        type: 'date',
        required: true,
        order: 3,
        surveyId: surveys[1].id
      },
      {
        text: 'Please upload maps of your harvesting areas',
        type: 'file_upload',
        required: true,
        order: 4,
        helpText: 'Accepted formats: PDF, JPG, PNG, GeoJSON',
        surveyId: surveys[1].id
      }
    ]);

    // Create some sample responses
    const responses = await Response.bulkCreate([
      {
        value: 'true',
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'approved',
        questionId: questions1[0].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
      },
      {
        value: 'FSC,PEFC,ISO 14001',
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'approved',
        questionId: questions1[1].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
      },
      {
        value: 'We use a combination of satellite monitoring and regular field audits. Our team conducts monthly reviews of satellite imagery and quarterly field visits to all active harvesting sites.',
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'approved',
        questionId: questions1[2].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
      },
      {
        value: '95',
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'approved',
        questionId: questions1[3].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
      },
      {
        value: '',
        fileUrl: 'https://example.com/uploads/nordic_timber_sustainability_report_2024.pdf',
        submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        status: 'approved',
        questionId: questions1[4].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
      },
      {
        value: 'false',
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        status: 'approved',
        questionId: questions2[0].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) // 9 days ago
      },
      {
        value: 'Third-party verification,Field audits',
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        status: 'approved',
        questionId: questions2[1].id,
        supplierId: suppliers[2].id,
        reviewedBy: users[1].id,
        reviewedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) // 9 days ago
      }
    ]);

    console.log('Questions and responses created successfully');
    console.log('Database seeding completed successfully!');

    return {
      organizations,
      users,
      suppliers,
      products,
      nodes,
      connections,
      grievances,
      satelliteAlerts,
      kpis,
      surveys,
      questions1,
      questions2,
      responses
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedData;
