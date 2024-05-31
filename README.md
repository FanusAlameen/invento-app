# Invento

Invento is an inventory management application built with React, Redux, Node.js, Express.js, and MySQL. It allows users to manage their inventory, track sales and purchases, and generate reports.

## Features

- **User Authentication:** Secure user authentication system using JWT tokens.
- **Inventory Management:** create, and update products in the inventory.
- **Sales and Purchases:** Record sales and purchases, and track quantities.
- **Records:** Export tables for sales, purchases, etc.

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS, Daisy UI
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Testing:** Jest, Playwright (yet to be updated)
- **API Testing:** Postman

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/FanusAlameen/invento.git
   ```
2. Install dependencies for the client and backend:
   ```sh
   cd invento/client
   npm install
   cd ../backend
   npm install
   ```
3. Set up the MySQL database and configure the `.env` files in the `client` and `backend` directories.
4. Run the development servers:
   ```sh
   cd client
   npm run dev
   cd ../backend
   nodemon index.js
   ```
5. Access the application at `http://localhost:3000` in your browser.

## Folder Structure

- `client`: Frontend React application.
- `backend`: Backend Node.js and Express.js server.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
