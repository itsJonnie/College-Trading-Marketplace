
# Campus Trading Platform

A full-stack web application that enables students to trade textbooks, study materials, and other items with each other.

## Overview

This platform allows users to list items they want to trade and make offers on other users' items. It's built with modern web technologies and provides a responsive UI for a seamless trading experience.

## Technologies Used

- **Frontend**: React with TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Routing**: Wouter
- **Authentication**: Passport.js

## Features

- Browse items by category (Textbooks, Notes, Study Materials, Electronics, etc.)
- View detailed item information
- Contact item owners
- Make trade offers on items
- Manage trade offers (accept/reject)
- User authentication

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Development

Run the development server:

```
npm run dev
```

This will start both the backend server and the frontend development server.

The application will be available at: http://localhost:5000

### Building for Production

Build the application:

```
npm run build
```

Start the production server:

```
npm start
```

## Project Structure

- `/client`: Frontend React application
  - `/src`: Source code
    - `/components`: Reusable UI components
    - `/pages`: Application pages
- `/server`: Backend Express application
  - `index.ts`: Server entry point
  - `routes.ts`: API route definitions
  - `storage.ts`: Database interactions
- `/shared`: Code shared between frontend and backend
  - `schema.ts`: Database schema and validation

## API Endpoints

### Items

- `GET /api/items`: Get all items
- `GET /api/items?category=:category`: Get items by category
- `GET /api/items/:id`: Get a specific item
- `POST /api/items`: Create a new item

### Trade Offers

- `GET /api/items/:id/offers`: Get all offers for an item
- `POST /api/items/:id/offers`: Create a new offer for an item
- `PATCH /api/offers/:id/status`: Update an offer's status (accept/reject)

### Users

- `GET /api/users/:id`: Get user details

## Database Schema

The application uses three main tables:

1. **users**: Stores user information
2. **items**: Stores information about items available for trade
3. **trade_offers**: Stores trade offer details

## License

MIT License
