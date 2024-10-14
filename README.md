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
   ```
4. The frontend will be available at http://localhost:3000 and the backend at http://localhost:5001.
5. Backend API documentation is available at http://localhost:5001/docs.

## Additional Notes

The system uses Nodemon in the backend for a smoother development experience.
The MongoDB database is located in the mongodb container, and you can interact with it from the backend using the connection defined in the environment variables.

## Commits and Branches

For new features, bug fixes, and other changes, please create a new branch and open a pull request to the main branch. The pull request should include a description of the changes and the issue it addresses.
For commit , first :

```bash
npm i
```

To install the commitizen package to run prettier and format on commit.

# Project Functionality
First, you need to start the servers and the database with:

```bash
docker compose build
docker-compose up
```

After this, the frontend will be available at [http://localhost:3000/](http://localhost:3000/) and the backend hosted at [http://localhost:5001](http://localhost:5001). The database will be running at `localhost:27030`.

For demonstration purposes, a migration runs when the repository starts, and if there are no existing data, it creates a "Rule settings discounts" for a merchant. This setup allows for the generation of only two tickets, aside from the one that will be used. On the third purchase, no discount ticket (gift card) will be generated, and an already generated discount ticket (A2AB1A) will be utilized.

## How to Use

Go to the frontend, where you will find a card and a mock purchase already configured. Enter the Discount code (maximum length of 6 digits) and click on "Pay Now." You will be redirected to a resume page that displays the final amount paid (with or without a discount) and whether a ticket was generated. Additionally, an email with the ticket should be sent to the user if the rules are satisfied.

## Considerations for the Project

- The goal is to create dynamic rules so that multiple merchants can generate flexible rules for their marketing campaigns. An endpoint should also be generated to allow them to send these coupons to their customers.
- Each discount contains the details of the user utilized.
- There is a need for logic to handle new users and the associated number of tickets.

## Possible Improvements

### Frontend
- User validations and feedback
- Enhanced styling
- Responsive design
- Testing
- Interface improvements corresponding to backend callbacks

### Backend
- Improved validations for both DIo and schemas
- Finalize mock services
- Coupon generation for merchants or campaign creators, including a public endpoint for generating along with customer emails
- Implementation of discount limits or user logic
- Generation of reports for merchants
- Implement discount logic and payment orders with real products (create models and services)
- Refactoring and improvements in implementation code, including example providers
- Enhanced security (currently, keys are hardcoded, but there should be middleware, different users, and logging information)
- Information and error logging examples (e.g., New Relic)
- Better documentation (more accurate response and request details) - Swagger
- Integration and unit testing
- Interface enhancements
