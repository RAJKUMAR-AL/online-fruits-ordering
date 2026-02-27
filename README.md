# Online Fruits Ordering System

A full-stack web application for ordering fresh fruits online.

## Features
- Browse fruit catalog with images and prices
- Add items to cart
- Place orders with customer details
- MongoDB integration for order storage
- Responsive Bootstrap design

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Make sure MongoDB is running locally
4. Start the server: `npm start`
5. Open http://localhost:5000

## Deployment

This app is configured for Vercel deployment. Make sure to:
1. Set up MongoDB Atlas for production database
2. Add `MONGODB_URI` environment variable in Vercel dashboard
3. Deploy from GitHub repository

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required for production)
- `NODE_ENV`: Set to 'production' for production deployment