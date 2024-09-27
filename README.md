# Deels
Deels Assignment is a frontend application built using **Next.js**. It uses **ESLint** for code quality and follows best practices to ensure maintainable and scalable code. This project is focused on providing a smooth and modern user interface.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## Overview
Deels is a Next.js application, primarily focused on the frontend side of web development. The app uses ESLint to ensure that the code adheres to standard linting rules, making it more readable and bug-free.

## Installation
To set up the project locally, follow these steps:

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (version 16 or above)
- **npm** or **yarn** for dependency management

### Steps to Install
1. Clone the repository:
    ```bash
    git clone https://github.com/darkball1/deels.git
    ```
2. Navigate into the project directory:
    ```bash
    cd deels
    ```
3. Install all dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app in development mode.

### Running in Production Mode
To build the app for production and run it:
1. Create an optimized build:
    ```bash
    npm run build
    ```
2. Start the production server:
    ```bash
    npm start
    ```
3. The app will be running at [http://localhost:3000](http://localhost:3000).

## Usage
Once the application is running, navigate through the different sections of the app, and explore its functionality.
- **Development Mode**: To start in development mode and enable hot-reloading for development:
    ```bash
    npm run dev
    ```
- **Production Mode**: To create a production-optimized build and serve it:
    ```bash
    npm run build
    npm start
    ```

### Linting
Run the ESLint linter to check for issues in the code:
```bash
npm run lint
```

## Features
- Modern and responsive user interface
- Fast page loading and navigation with Next.js
- Component-based architecture for reusability
- ESLint integration for code quality assurance

## Technologies
- **Next.js**: React framework for production-grade applications
- **React**: JavaScript library for building user interfaces
- **ESLint**: Static code analysis tool for identifying problematic patterns
- **CSS Modules**: CSS file naming convention for scoped styling
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **npm**: Package manager for JavaScript

## Folder Structure
```
src
    └───app
        ├───(routes)
        ├───api
        │   ├───entities
        │   │   ├───roles
        │   │   └───[list]
        │   ├───structures
        │   │   ├───list
        │   │   └───roles
        │   └───users
        ├───fonts
        ├───_assets
        ├───_components
        │   ├───entities
        │   │   └───components
        │   ├───members
        │   ├───name
        │   └───structures
        └───_libs
```

## Code Quality
This project uses ESLint to maintain code quality. The configuration can be found in `.eslintrc.json`. To ensure your code meets the project's standards, run the linter before committing changes:

```bash
npm run lint
```

## Contributing
We welcome contributions to the Deels project! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the project's coding standards and passes all linting checks.
