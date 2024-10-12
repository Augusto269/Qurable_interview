# Coupon Redemption System

## Description

This project implements a coupon redemption system for an existing checkout flow in an e-commerce platform. The objective is for users to apply coupons for discounts and generate gift cards (coupons) after a successful purchase.

This project uses a microservices architecture based on Docker, with a frontend built in React using TypeScript and a backend in NestJS connected to a MongoDB database.

### Key Features:

1. Users can enter coupon codes to receive a discount during checkout.
2. Coupons are validated for availability and specific rules.
3. The system allows assigning new gift cards (coupon codes) after completing a purchase.
4. Coupons cannot be reused once redeemed.
5. Maximum number of coupons per user and total coupons are configurable.

## Technologies Used

- **Frontend**: React, TypeScript, Material UI, TailwindCSS
- **Backend**: Node.js, NestJS
- **Database**: MongoDB
- **Containers**: Docker, Docker Compose

## How to Run the Project

1. Clone this repository to your local machine.
2. Ensure you have Docker and Docker Compose installed.
3. Run the following command to build and start the containers:
   ```bash
   docker-compose up --build
4. The frontend will be available at http://localhost:3000 and the backend at http://localhost:5001.
## Additional Notes
The system uses Nodemon in the backend for a smoother development experience.
The MongoDB database is located in the mongodb container, and you can interact with it from the backend using the connection defined in the environment variables.
