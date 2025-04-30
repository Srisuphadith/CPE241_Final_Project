# CPE241_Final_Project

## Web Structure

### Root-Level Files:
- **docker-compose.yml** – This file is used for defining and running multi-container Docker applications. It specifies how the backend, frontend, and database services should be configured and connected.
- **.env** – This file contains environment variables used in your application (e.g., database credentials, secret keys). These values should not be hardcoded in the code, making them easy to change based on the environment (development, production).
- **.gitignore** – This file specifies which files and directories Git should ignore when committing changes. Typically includes `node_modules/`, `.env`, and build files.
- **README.md** – This file provides an overview of the project, installation instructions, and any relevant documentation for contributors or users.

### Backend Folder (`backend/`):
This folder contains all the server-side logic, routes, database connection, and authentication for the backend of your MERN stack application.

1. **config/db.js**:
   - This file will hold the database connection logic.
   - It uses your environment variables to connect to the MySQL database securely, preventing sensitive information from being exposed in the code.

2. **controllers/authController.js**:
   - It contains the business logic for authentication, such as handling user login and signup.
   - The controller will interact with the database, hash passwords, and send appropriate responses to the client (frontend).

3. **routes/authRoutes.js**:
   - This file defines the API endpoints for authentication, e.g., `/api/login`, `/api/signup`.
   - It links the routes to the corresponding controller functions.

4. **middlewares/authMiddleware.js**:
   - This file is optional but helpful for protecting routes that need to be accessed only by authenticated users.
   - You can use this middleware to verify whether the user has a valid session or token.

5. **server.js** (renamed from `index.js`):
   - This is the entry point of your backend application.
   - It sets up the server using `Express.js`, applies middleware, sets up routes, and starts listening on the designated port.
   - It also integrates with Docker by exposing the backend service on port `5000` (as specified in your `docker-compose.yml`).

### Database Folder (`db/`):
This folder holds your database-related files like SQL scripts for setting up and seeding your database.

1. **init.sql**:
   - This file contains SQL statements that initialize the database schema (e.g., creating tables, relationships, users).
   - It’s typically used to create the initial structure of your database.

2. **mock_data.sql**:
   - This file is used to populate the database with sample data (e.g., mock users, products) to help during development and testing.
   - It ensures that the app can work with data before going live or during testing.

### Frontend Folder (`frontend/`):
This folder contains all the client-side logic, React components, and styles for your application.

1. **public/**:
   - This folder contains static files that will be served as-is. For example, the `index.html` file, favicon, and images that don’t need to be processed by Webpack or React.

2. **src/**:
   - This is the main source directory for your React application.
   - **assets/img/**: Stores images that are used across the app, such as product images or icons.
   - **components/**: Contains reusable UI components like `Navbar`, `Footer`, `ProductCard`, etc.
   - **pages/**: Contains components that represent entire pages in the app (like authentication pages, user dashboard, seller’s page, etc.).
     - **Admin/**, **Seller/**, **User/**: These folders help organize different views for various user roles. For example, the `Admin` folder might contain components related to managing products, users, and orders.
   - **index.css**: The global CSS file that applies styles to your app, but as your app grows, you might want to modularize the CSS into different files per component.
   - **index.jsx**: The entry point of the React application. It renders the main React component (like `App.js`) and links everything together.
   
3. **node_modules/**:
   - This folder contains all the dependencies for the frontend application. You don’t directly interact with this folder; it is populated when you run `npm install` or `yarn install`.

4. **Dockerfile**:
   - This file contains the instructions for creating the Docker image for your frontend application.
   - It sets up the environment, installs dependencies, builds the app, and configures how the app will run inside a Docker container.

5. **package-lock.json** & **package.json**:
   - These files store the metadata and dependencies for the frontend application.
   - `package.json` lists the dependencies and scripts to run the app.
   - `package-lock.json` locks the versions of dependencies to ensure consistency across environments.

6. **postcss.config.js**:
   - This file is used to configure PostCSS, which is a tool to transform CSS. It is commonly used with Tailwind CSS, a utility-first CSS framework.

7. **tailwind.config.js**:
   - This file is the configuration for Tailwind CSS. It defines custom configurations like colors, spacing, and breakpoints to match the design of your project.

### Final Thoughts:
- **Backend (`/backend/`)**: Responsible for handling the business logic, database interactions, authentication, and serving APIs.
- **Frontend (`/frontend/`)**: Handles the user interface, interactions, and communication with the backend through API calls.
- **Database (`/db/`)**: Contains SQL scripts to initialize and seed the database.