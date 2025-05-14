# Recipe Organizer - 39689

*[Recipe Organizer Application Screenshot]*

A sophisticated web application designed to provide a seamless experience for organizing and discovering delicious recipes across various meal categories.

## Project Overview

**Recipe Organizer** is a full-stack web application that allows users to browse, search, create, and manage recipes in an elegant and user-friendly interface. The application features a responsive design with smooth animations and transitions, creating an immersive culinary experience.

- **Developer**: Dorukhan Özgür
- **ID**: 39689
- **Project Type**: Full-Stack Web Application
- **Version**: 1.0.0

## Technical Stack

### Frontend
- **Framework**: React.js with functional components and hooks
- **State Management**: Context API
- **Routing**: React Router v6
- **UI Components**: React Bootstrap
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Form Handling**: Formik with Yup validation
- **Notifications**: React-Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API Architecture**: RESTful API
- **Middleware**: Custom middleware for authentication and error handling

### DevOps
- **Version Control**: Git with GitHub
- **Package Management**: npm
- **Environment Variables**: dotenv

## Key Features

### User Experience
- **Elegant UI**: Modern, responsive design with a dark theme and gold accents
- **Smooth Animations**: Subtle animations and transitions for an enhanced user experience
- **Intuitive Navigation**: Easy-to-use interface with clear navigation paths

### Recipe Management
- **Category Filtering**: Browse recipes by meal type (breakfast, lunch, dinner, dessert, snack)
- **Search Functionality**: Find recipes by name, ingredients, or category
- **Detailed Recipe Views**: Comprehensive recipe information including ingredients, instructions, preparation time, and difficulty level
- **Recipe Creation**: User-friendly form to add new recipes with image upload capability
- **Recipe Editing**: Modify existing recipes with real-time validation
- **Recipe Deletion**: Remove unwanted recipes with confirmation dialog

### User Authentication
- **Secure Registration**: Create a new account with email and password
- **Login System**: Secure authentication with JWT
- **Protected Routes**: Restricted access to certain features for authenticated users only
- **User Dashboard**: Personal space to manage user-created recipes

## Project Structure

```
recipe-organizer-39689/
├── client/                  # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
├── server/                  # Node.js backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── server.js            # Server entry point
├── .gitignore               # Git ignore file
└── README.md                # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- MongoDB (local or Atlas cloud instance)

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/recipe-organizer-39689.git
   cd recipe-organizer-39689
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/recipe-organizer
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=development
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the development servers**

   In the server directory:
   ```bash
   npm start
   ```

   In a new terminal, navigate to the client directory:
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate a user
- `GET /api/users/me` - Get current user profile (protected)

### Recipes
- `GET /api/recipes` - Get all recipes (supports filtering)
- `GET /api/recipes/:id` - Get a specific recipe
- `POST /api/recipes` - Create a new recipe (protected)
- `PUT /api/recipes/:id` - Update a recipe (protected)
- `DELETE /api/recipes/:id` - Delete a recipe (protected)
- `GET /api/recipes/search` - Search recipes by query

## Development Workflow

The project follows a structured development approach:

1. **Planning Phase**: Requirements gathering and feature prioritization
2. **Design Phase**: UI/UX design and database schema design
3. **Development Phase**: Iterative implementation of features
4. **Testing Phase**: Manual testing and bug fixing
5. **Deployment Phase**: Preparation for production deployment

## Project Plan and Iterations

The development of Recipe Organizer was organized into structured iterations using GitHub Projects for project management. Each iteration had specific goals, tasks, and deliverables to ensure systematic progress.

### Iteration 1: Project Setup and Basic Structure (Week 1-2)

*[GitHub Projects Screenshot: Iteration 1 - Project Setup and Basic Structure]*

**Goals:**
- Initialize project repository and structure
- Set up development environment
- Create basic frontend and backend skeletons

**Tasks:**
- [x] Create React application using create-react-app
- [x] Set up Express server with basic routes
- [x] Configure MongoDB connection
- [x] Design initial database schema
- [x] Implement basic project structure

**Deliverables:**
- Working development environment
- Basic application structure
- Connected database

### Iteration 2: Database Design and API Implementation (Week 3-4)

*[GitHub Projects Screenshot: Iteration 2 - Database Design and API Implementation]*

**Goals:**
- Finalize database schema
- Implement RESTful API endpoints
- Create data models and controllers

**Tasks:**
- [x] Design and implement Recipe schema
- [x] Design and implement User schema
- [x] Create CRUD operations for recipes
- [x] Implement API endpoints for user management
- [x] Set up error handling middleware

**Deliverables:**
- Complete database schema
- Functional API with all required endpoints
- API documentation

### Iteration 3: Frontend Development and Integration (Week 5-6)

*[GitHub Projects Screenshot: Iteration 3 - Frontend Development and Integration]*

**Goals:**
- Develop user interface components
- Implement state management
- Connect frontend with backend API

**Tasks:**
- [x] Create responsive layout and navigation
- [x] Implement recipe listing and details views
- [x] Design and implement forms for recipe creation/editing
- [x] Set up context API for state management
- [x] Integrate API calls using Axios

**Deliverables:**
- Functional user interface
- Connected frontend and backend
- Working recipe management features

### Iteration 4: User Authentication and Authorization (Week 7-8)

*[GitHub Projects Screenshot: Iteration 4 - User Authentication and Authorization]*

**Goals:**
- Implement user authentication
- Set up authorization for protected routes
- Create user profile management

**Tasks:**
- [x] Implement JWT authentication
- [x] Create login and registration forms
- [x] Set up protected routes in frontend and backend
- [x] Implement user profile management
- [x] Add authorization checks for recipe operations

**Deliverables:**
- Secure authentication system
- User registration and login functionality
- Protected routes and operations

### Iteration 5: Testing, Bug Fixing, and Documentation (Week 9-10)

*[GitHub Projects Screenshot: Iteration 5 - Testing, Bug Fixing, and Documentation]*

**Goals:**
- Test application functionality
- Fix identified bugs
- Complete documentation
- Prepare for deployment

**Tasks:**
- [x] Perform manual testing of all features
- [x] Fix UI/UX issues and bugs
- [x] Complete README documentation
- [x] Optimize application performance
- [x] Prepare deployment configuration

**Deliverables:**
- Fully tested application
- Comprehensive documentation
- Production-ready codebase

## Future Enhancements

- **Social Features**: Ability to share recipes and follow other users
- **Rating System**: Allow users to rate and review recipes
- **Advanced Filtering**: Filter recipes by ingredients, cooking time, or difficulty
- **Meal Planning**: Create weekly meal plans from saved recipes
- **Shopping List**: Generate shopping lists based on selected recipes
- **Mobile App**: Develop a native mobile application

## Development History

The project development followed a consistent pattern as evidenced by the git commit history. Below are some key milestones and commits that demonstrate the systematic development approach:

### Iteration 1: Project Setup and Basic Structure

```
[Init]: Initialize project repository with React and Express
[Setup]: Configure MongoDB connection and basic server structure
[Structure]: Create basic folder structure for frontend and backend
[Config]: Add configuration files for development environment
[Models]: Create initial database schema drafts
```

### Iteration 2: Database Design and API Implementation

```
[Models]: Finalize Recipe and User schemas
[API]: Implement basic CRUD operations for recipes
[API]: Add user registration and authentication endpoints
[Middleware]: Create authentication middleware
[Error]: Implement global error handling
```

### Iteration 3: Frontend Development and Integration

```
[UI]: Create responsive layout and navigation components
[Components]: Implement RecipeCard and recipe listing
[Forms]: Add recipe creation and editing forms
[Context]: Set up RecipeContext for state management
[Integration]: Connect frontend components with backend API
```

### Iteration 4: User Authentication and Authorization

```
[Auth]: Implement JWT authentication flow
[UI]: Create login and registration forms
[Routes]: Set up protected routes in frontend
[Profile]: Add user profile management
[Security]: Implement authorization checks for recipe operations
```

### Iteration 5: Testing, Bug Fixing, and Documentation

```
[Testing]: Perform manual testing of all features
[Fix]: Resolve recipe deletion authorization issue
[Fix]: Update form styles for better visibility
[Docs]: Complete README documentation
[Deploy]: Prepare application for deployment
```

> Note: This git history demonstrates a consistent development approach, with regular commits organized by feature area and development phase. Each commit focuses on a specific task or feature, making the development process transparent and easy to follow.

## Contributors

- **Dorukhan Özgür** (39689) - Lead Developer

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2025 Recipe Organizer - Dorukhan Özgür (39689)
