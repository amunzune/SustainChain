# SustainChain Navigator - User Guide

This guide provides detailed instructions for using the SustainChain Navigator platform, a comprehensive solution for managing forest product supply chains with sustainability at its core.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Navigation](#navigation)
3. [Traceability Engine](#traceability-engine)
4. [Satellite Monitoring](#satellite-monitoring)
5. [Grievance Management](#grievance-management)
6. [KPI Dashboard](#kpi-dashboard)
7. [Supplier Engagement](#supplier-engagement)
8. [Admin Console](#admin-console)
9. [User Roles and Permissions](#user-roles-and-permissions)
10. [Troubleshooting](#troubleshooting)

## Getting Started

### Logging In

1. Navigate to the SustainChain Navigator login page
2. Enter your username and password
3. Click "Sign In"

If you don't have an account, contact your organization's administrator to create one for you.

### First-time Setup

After your first login, we recommend:

1. Updating your password
2. Reviewing your profile information
3. Familiarizing yourself with the navigation and available modules

## Navigation

The SustainChain Navigator interface consists of:

- **Left Sidebar**: Main navigation menu organized by module
- **Top Header**: User information, notifications, and logout
- **Main Content Area**: Module-specific content and functionality

## Traceability Engine

The Traceability Engine allows you to visualize and manage your supply chain map.

### Viewing the Supply Chain Map

1. Navigate to **Traceability > Supply Chain Map**
2. The interactive map displays all nodes and connections in your supply chain
3. Use the zoom controls to explore different levels of detail
4. Click on any node to view detailed information

### Importing Supply Chain Data

1. Navigate to **Traceability > Supply Chain Map**
2. Click the "Import Data" button
3. Select the file format (CSV or JSON)
4. Upload your file or drag and drop it into the designated area
5. Map the columns in your file to the required fields
6. Click "Import" to process the data

### Managing Suppliers

1. Navigate to **Traceability > Suppliers**
2. View the list of all suppliers in your supply chain
3. Click on a supplier to view detailed information
4. Use the "Add Supplier" button to manually add a new supplier
5. Edit or deactivate suppliers as needed

### Managing Products

1. Navigate to **Traceability > Products**
2. View the list of all products in your supply chain
3. Click on a product to view detailed information and traceability
4. Use the "Add Product" button to manually add a new product
5. Update product verification status as needed

## Satellite Monitoring

The Satellite Monitoring module provides alerts and visualization of potential deforestation or land use changes.

### Viewing Satellite Alerts

1. Navigate to **Monitoring > Satellite Monitoring**
2. The map displays all current alerts with color-coded severity
3. Use the filters to narrow down alerts by region, date, or severity
4. Click on any alert to view detailed information and imagery

### Generating Mock Alerts (Demo Feature)

1. Navigate to **Monitoring > Satellite Monitoring**
2. Click the "Generate Mock Alerts" button
3. Select the region and number of alerts to generate
4. Click "Generate" to create sample alerts for demonstration purposes

## Grievance Management

The Grievance Management module allows you to log, track, and resolve grievances related to your supply chain.

### Logging a New Grievance

1. Navigate to **Monitoring > Grievances**
2. Click the "Log New Grievance" button
3. Fill in all required fields:
   - Title and description
   - Date reported
   - Source of the grievance
   - Type (deforestation, labor, land rights, etc.)
   - Location and coordinates
   - Associated supplier (if applicable)
   - Severity level
4. Click "Submit" to create the grievance

### Managing Grievances

1. Navigate to **Monitoring > Grievances**
2. View the list of all grievances
3. Use the filters to narrow down by status, type, or severity
4. Click on any grievance to view detailed information
5. Update the status, add notes, or upload evidence as needed

### Viewing the Grievance Heatmap

1. Navigate to **Monitoring > Grievance Heatmap**
2. The map displays the concentration of grievances across your supply chain
3. Use the filters to view specific types or time periods
4. Identify hotspots that may require additional attention or resources

## KPI Dashboard

The KPI Dashboard provides visualization and tracking of key sustainability metrics.

### Viewing KPIs

1. Navigate to **Performance > KPI Dashboard**
2. The dashboard displays key metrics including:
   - Percentage of verified Deforestation-Conversion-Free (DCF) supply
   - Grievance resolution rate
   - Percentage of suppliers with sustainability plans
3. Use the time period selector to view trends over different periods

### Drilling Down into Metrics

1. Click on any KPI card to view detailed information
2. See historical trends and progress toward targets
3. Export data for reporting purposes

## Supplier Engagement

The Supplier Engagement module facilitates communication and data collection from suppliers.

### Creating a Survey

1. Navigate to **Engagement > Surveys**
2. Click the "Create New Survey" button
3. Fill in the survey details:
   - Title and description
   - Start and end dates
   - Target audience (all suppliers, high-risk suppliers, etc.)
   - Whether the survey is required
4. Add questions to the survey:
   - Click "Add Question"
   - Select the question type (text, multiple choice, boolean, etc.)
   - Enter the question text and any help text
   - Set whether the question is required
   - Add validation rules if needed
5. Click "Save" to create the survey

### Viewing Survey Responses

1. Navigate to **Engagement > Surveys**
2. Click on a survey to view its details
3. Click the "View Responses" button
4. See a summary of responses and completion rate
5. Click on individual supplier responses for detailed information
6. Export responses for analysis or reporting

## Admin Console

The Admin Console provides system-wide configuration and management capabilities.

### Managing Users

1. Navigate to **Administration > User Management**
2. View the list of all users
3. Click "Add User" to create a new user account
4. Set the user's role and permissions
5. Edit or deactivate users as needed

### System Settings

1. Navigate to **Administration > System Settings**
2. Configure global settings for the platform
3. Set up notification preferences
4. Configure security settings
5. Click "Save" to apply changes

### API Configuration

1. Navigate to **Administration > API Configuration**
2. Configure integration with external systems:
   - Salesforce
   - SAP
   - Carbon Accounting tools
3. Set up API keys and endpoints
4. Test connections to ensure proper integration

### Viewing Audit Logs

1. Navigate to **Administration > Audit Logs**
2. View a record of all system activities
3. Filter by user, action type, or date range
4. Export logs for compliance or security reviews

## User Roles and Permissions

SustainChain Navigator has four primary user roles:

### Admin
- Full access to all modules and functionality
- Can manage users and system settings
- Can configure API integrations
- Can view audit logs

### Analyst
- Can view and analyze all supply chain data
- Can create and manage surveys
- Can log and manage grievances
- Cannot access system settings or user management

### Supplier
- Limited view of supply chain data
- Can respond to surveys
- Can view and update their own information
- Cannot access other suppliers' data

### Partner
- Can view shared supply chain data
- Can log grievances
- Cannot modify system data or settings

## Troubleshooting

### Common Issues

#### Login Problems
- Ensure you're using the correct username and password
- Check if your account has been deactivated
- Try resetting your password

#### Data Import Errors
- Ensure your file is in the correct format (CSV or JSON)
- Check that all required fields are present
- Verify that coordinates are in the correct format

#### Map Display Issues
- Ensure your browser is up to date
- Try clearing your browser cache
- Check your internet connection

### Getting Help

If you encounter issues not covered in this guide:

1. Click the "Help" icon in the top right corner
2. Check the FAQ section for common questions
3. Contact support at support@sustainchain.example
4. Provide detailed information about the issue, including screenshots if possible
