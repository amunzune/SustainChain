# SustainChain Navigator

SustainChain Navigator is a web-based platform designed for organizations managing forest product supply chains. The platform integrates traceability mapping, satellite monitoring, grievance tracking, KPI dashboards, and supplier engagement tools to support sustainable supply chain management.

![SustainChain Navigator](docs/images/sustainchain-logo.png)

## Features

### 1. Traceability Engine
- Interactive supply chain maps with nodes and connections
- CSV/JSON data import for suppliers and brands
- Risk flagging based on region and supplier history
- Built with Leaflet.js for interactive mapping

### 2. Satellite Monitoring
- Embedded maps with deforestation alerts
- Simulated data from Sentinel/Planet imagery
- Automated alert generation for change detection
- Region and severity filtering

### 3. Grievance Management System
- CRUD interface for logging and tracking grievances
- Fields for date, source, type, status, and notes
- Grievance heatmap visualization over supply chain map
- Filtering and reporting capabilities

### 4. KPI Dashboard
- Track sustainability indicators
- Visualize % verified DCF, grievance resolution rates, supplier sustainability
- Interactive charts and metrics
- Built with Chart.js for data visualization

### 5. Supplier Engagement Portal
- Admin-facing form builder for sustainability surveys
- Supplier login for documentation submission
- File uploads and milestone tracking
- Response analytics and reporting

### 6. Admin Console
- User management with role-based permissions
- System settings configuration
- API endpoint configuration for integration
- Audit logs and activity tracking

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL with Sequelize ORM
- JWT Authentication
- RESTful API design

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Mapbox/Leaflet.js for mapping
- Chart.js for data visualization

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v13+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sustainchain-navigator.git
cd sustainchain-navigator
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory based on `.env.example`
   - Configure your database connection and JWT secret

5. Initialize the database
```bash
cd ../backend
npm run db:create
npm run db:migrate
```

6. Seed the database with sample data
```bash
npm run db:seed
```

7. Start the development servers
```bash
# In the backend directory
npm run dev

# In the frontend directory (in a new terminal)
npm start
```

8. Access the application
   - Backend API: http://localhost:8080
   - Frontend: http://localhost:3000

## Default Users

After seeding the database, you can log in with the following credentials:

| Username | Password    | Role     |
|----------|-------------|----------|
| admin    | password123 | Admin    |
| analyst  | password123 | Analyst  |
| supplier | password123 | Supplier |
| partner  | password123 | Partner  |

## Environment Variables

### Backend (.env)
```
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sustainchain
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400

# Optional External API Keys
MAPBOX_API_KEY=your-mapbox-key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
```

## Project Structure

```
sustainchain-navigator/
├── backend/                 # Backend Node.js/Express application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── tests/               # Backend tests
│   └── package.json         # Backend dependencies
│
├── frontend/                # Frontend React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── contexts/        # React contexts
│   │   ├── layouts/         # Page layouts
│   │   ├── modules/         # Feature modules
│   │   │   ├── admin/       # Admin module
│   │   │   ├── dashboard/   # KPI dashboard module
│   │   │   ├── grievance/   # Grievance management module
│   │   │   ├── satellite/   # Satellite monitoring module
│   │   │   ├── supplier/    # Supplier engagement module
│   │   │   └── traceability/# Traceability engine module
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   └── package.json         # Frontend dependencies
│
└── docs/                    # Documentation
    ├── architecture.md      # Architecture documentation
    ├── api.md               # API documentation
    └── images/              # Documentation images
```

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Deployment

### Backend Deployment
1. Build the backend
```bash
cd backend
npm run build
```

2. Start the production server
```bash
npm start
```

### Frontend Deployment
1. Build the frontend
```bash
cd frontend
npm run build
```

2. Serve the static files using a web server like Nginx or deploy to a service like Vercel, Netlify, or AWS S3.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was developed as an MVP for organizations managing forest product supply chains
- Special thanks to all contributors and stakeholders who provided requirements and feedback
