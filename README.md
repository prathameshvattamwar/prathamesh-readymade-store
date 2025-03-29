# Prathamesh Readymade and Hosiery Store

A full-stack e-commerce website for a clothing and accessories store. This project demonstrates a complete online shopping experience with responsive design, product browsing, cart management, and checkout process.

## Features

- **Responsive Design**: Mobile-friendly interface with hamburger menu
- **Product Management**: Browse by categories, featured items, new arrivals
- **User Authentication**: Register, login, user profiles
- **Shopping Experience**: Add to cart, favorites, quantity adjustment
- **Checkout Process**: Address information, payment methods
- **Admin Panel**: Product management, order processing

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5 for responsive design
- Local Storage for cart and user session management

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Project Structure

prathamesh-store/
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── index.html, products.html, etc.
└── backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js


## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB

### Backend Setup
1. Navigate to the backend directory: cd backend
2. Install dependencies: npm install
3. Create a `.env` file with the following:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
4. Start the server: npm run dev

### Frontend Setup
1. Navigate to the frontend/public directory
2. Open `index.html` in your browser or use a tool like Live Server in VS Code

## Demo Accounts

For testing purposes, you can use these demo accounts:

- **Admin User**:
- Email: admin@example.com
- Password: 123456

- **Regular User**:
- Email: john@example.com
- Password: 123456

## Deployment

This application can be deployed using:
- Backend: Render, Heroku, or AWS
- Frontend: Netlify, Vercel, or GitHub Pages
- Database: MongoDB Atlas

## Future Enhancements

- Payment gateway integration
- Order tracking system
- Product reviews and ratings
- Wish list sharing
- Email notifications

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Prathamesh - prathamesh.vattamwar24@gmail.com

Project Link: [https://github.com/prathameshvattamwar/prathamesh-readymade-store](https://github.com/prathameshvattamwar/prathamesh-readymade-store)
   
