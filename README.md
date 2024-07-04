# Natours

Natours is a modern, feature-rich web application for booking outdoor tours. It is built using Node.js, Express, MongoDB, and Pug.

## Features

- **User Authentication:** Sign up, log in, and manage your profile.
- **Tour Booking:** Browse available tours and book your adventure.
- **Real-time Notifications:** Receive updates about your bookings.
- **Interactive Maps:** View tour locations on dynamic maps.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/IslamEssam01/natours.git
    ```
2. Navigate to the project directory:
    ```bash
    cd natours
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables (e.g., database URI, JWT secret).
2. Example `.env` file:
    ```env
    NODE_ENV=development
    DATABASE=mongodb://localhost:27017/natours
    JWT_SECRET=your_jwt_secret
    ```

### Running the App

- **Development Mode:**
    ```bash
    npm run dev
    ```
- **Production Mode:**
    ```bash
    npm run start:prod
    ```

## Folder Structure

- **/controllers**: Contains route handlers.
- **/models**: Mongoose models.
- **/routes**: API routes.
- **/views**: Pug templates.
- **/public**: Static files (CSS, JS, images).

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Pug](https://pugjs.org/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
