# Ecommerce Dashboard

An admin and seller dashboard for managing an ecommerce platform. Built with React, React Router, and Tailwind CSS.
## Project Structure

# Ecommerce Dashboard

An admin and seller dashboard for managing an ecommerce platform. Built with React, React Router, and Tailwind CSS.

---


## Table of Contents
- [Ecommerce Dashboard](#ecommerce-dashboard)
	- [Project Structure](#project-structure)
- [Ecommerce Dashboard](#ecommerce-dashboard-1)
	- [Table of Contents](#table-of-contents)
	- [Backend Setup](#backend-setup)
	- [Admin Login Page Setup](#admin-login-page-setup)
	- [Project Overview](#project-overview)
	- [Project Structure](#project-structure-1)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Installation](#installation)
		- [Running the App](#running-the-app)
		- [Building for Production](#building-for-production)
		- [Running Tests](#running-tests)
	- [Features](#features)
	- [Contributing](#contributing)
	- [License](#license)
	- [Project Packages Installed](#project-packages-installed)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
	- [Available Scripts](#available-scripts)
		- [`npm start`](#npm-start)
		- [`npm test`](#npm-test)
		- [`npm run build`](#npm-run-build)
		- [`npm run eject`](#npm-run-eject)
	- [Learn More](#learn-more)
		- [Code Splitting](#code-splitting)
		- [Analyzing the Bundle Size](#analyzing-the-bundle-size)
		- [Making a Progressive Web App](#making-a-progressive-web-app)
		- [Advanced Configuration](#advanced-configuration)
		- [Deployment](#deployment)
		- [`npm run build` fails to minify](#npm-run-build-fails-to-minify)
	- [Project Setup](#project-setup)
	- [Recommended VS Code Extensions](#recommended-vs-code-extensions)
---

## Backend Setup
---

## Admin Login Page Setup

The Admin Login page allows administrators to securely access the dashboard. To set up and use the Admin Login page:

1. Navigate to `/login` in your browser or use the login link in the app.
2. Enter your admin credentials (these should be created in your backend or database).
3. On successful login, you will be redirected to the admin dashboard.
4. If authentication fails, an error message will be displayed.

**File location:**
- Frontend: `src/views/auth/Login.jsx`
- Authentication logic: `src/store/Reducers/authReducer.js` and `src/api/api.js`

> **Note:** Ensure your backend is running and the API endpoints for authentication are correctly configured in the frontend.

---

This project requires a backend server for full functionality (authentication, data storage, etc.).

**Recommended steps:**

1. Clone or set up your backend repository (Node.js/Express, Django, etc.) in a separate folder.
2. Configure environment variables (e.g., API URLs, database credentials) as needed for your backend.
3. Start the backend server (commonly with `npm run start` or `npm run dev` for Node.js backends).
4. Update API endpoints in the frontend (see `src/api/api.js`) to match your backend server's URL (e.g., `http://localhost:5000/api`).

> **Note:** This frontend is decoupled from the backend. You can use any backend technology as long as the API contracts match.

---

---

## Project Overview

Ecommerce Dashboard is a web application designed for managing products, users, and orders in an ecommerce platform. It provides separate interfaces for admins and sellers, with authentication and protected routes. The project leverages React for the frontend, Redux for state management, and Tailwind CSS for styling.

---

## Project Structure

```
src/
  api/           # API utilities
  layout/        # Layout components (Header, Sidebar, MainLayout)
  navigation/    # Navigation configs
  router/        # Routing logic and route definitions
  store/         # Redux store and reducers
  utils/         # Utility functions
  views/
	 auth/        # Auth pages (Login, Register)
	 pages/       # Main dashboard pages
public/          # Static files
build/           # Production build output
```

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone the repository:
	```bash
	git clone <repo-url>
	cd dashboard
	```
2. Install dependencies:
	```bash
	npm install
	```

### Running the App
Start the development server:
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production
To create a production build:
```bash
npm run build
```
The output will be in the `build/` directory.

### Running Tests
To run tests:
```bash
npm test
```

---

## Features
- User authentication (Login, Register)
- Protected routes for admin and seller
- Responsive layout with sidebar and header
- Modular routing and navigation
- State management with Redux
- Styled with Tailwind CSS

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License
MIT
	```bash
	npx tailwindcss init
	```

For full setup instructions, see the [official Tailwind CSS guide for Create React App](https://v3.tailwindcss.com/docs/guides/create-react-app).
## Project Packages Installed

The following packages are installed and used in this project:

- **apexcharts**
- **react-apexcharts**
- **axios**
- **jwt-decode**
- **moment**
- **react-hot-toast**
- **react-icons**
- **@reduxjs/toolkit**
- **react-redux**
- **react-spinners**
- **react-window**
- **redux-thunk**
- **socket.io-client**

These packages provide charting, state management, icons, notifications, date handling, HTTP requests, and real-time communication features for the dashboard.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Setup

1. Clone the repository:
	```bash
	git clone <repo-url>
	cd dashboard
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the development server:
	```bash
	npm start
	```

## Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Simple React Snippets**
- **GitLens — Git supercharged**

These extensions help with code formatting, linting, and productivity when working with React projects.
