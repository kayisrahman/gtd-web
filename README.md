GTD Web Implementation Application

## Overview

This project is a web application based on the idea of **Getting Things Done (GTD)** and aims to provide a user with efficient management of their tasks using a structured workflow.
Accessing the Live Application
1.	Open a Web Browser:
•	Navigate to http://kayis-gtd.uksouth.cloudapp.azure.com.

## 1. Backend

The back end was made with Node.js and Express to support RESTful APIs that provide functionalities like creating and managing tasks and contexts and also interaction by users for GTD workflow.

Directory Structure
helper/: Contains utility files such as error-handlers.
- `repository/`: Handles database operations via a repository (`repo.js`).
    - `index.js`: Entry server file for initializing backend routes.
    - `package.json`, `package-lock.json`, `yarn.lock`: Package management files.
    - `tsconfig.json`: Configuration file for TypeScript.

### Setup

To set up an example, please see the [Setting Up Express Server with PostgreSQL](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#setting-up-express-server) section.

## 2. Frontend

The frontend is built using Angular for a responsive user interface when it comes to task management and GTD workflow.

- **Directory Structure**:
    - `src/`: Contains application source files, including components, services, models, and styles.
    - `pages/`: Houses the main feature modules (`inbox`, `organize`, `next-actions`, `someday/maybe`).
    - `components/`: Contains re-usable Angular components such as `top-bar`.
- `services/`: This manages the HTTP requests through services for tasks, contexts and GTD workflows.
    - `e2e/`: Contains end-to-end testing configuration.
    - `karma.conf.js`, `tsconfig.json`, `yarn.lock`: Testing and build configurations.

### Setup

1. Navigate into the `front-end` directory.
2. Install the dependencies: `npm install` or `yarn install`.
3. Start the development server: `ng serve`.

4. Navigate into the `back-end` directory.
5. Install the dependencies: `npm install` or `yarn install`.
6. Start the development server: `yarn run dev` or `npm run dev`.
   For further details about setting up Angular, please refer to the [Angular documentation](https://angular.io/docs).





## 3. Project Structure

- **Back-end**:
    - `helper/`: Utilities for error handling.
    - `repository/`: Database operations.
    - `index.js`: The main backend server.

- **Frontend**:
    - `app/`: Major Angular components, routing, and modules of GTD tasks.
- `assets/`: Static assets such as images and stylesheets.
    - `services/`: Business logic and data handling specific to GTD workflow.



## 4. Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Angular, SCSS, TypeScript
- **Testing**: Jasmine, Karma, Protractor
- **Dependency Management**: NPM, Yarn



## 5. Usage

- **Backend**: RESTful API endpoints are available at `/api/tasks`, `/api/contexts`, and `/api/gtd`.
- **Frontend**: A web-based interface oriented for GTD. It will make it possible for users to handle their tasks with an Inbox, Next Actions list, and Someday/Maybe list.

## 6. Testing

- **Unit Tests**: Individual component and service testing by the Jasmine framework
- **End-to-End Tests**: Protractor runs tests of whole user journeys in a GTD workflow

For additional information please check out the [Karma Jasmine Test Documentation](https://karma-runner.github.io).


## 7. References

1. [Setting Up Express Server with PostgreSQL](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#setting-up-express-server)
2. [Angular Documentation](https://angular.io/docs)
3. [Angular Material](https://material.angular.io/)
4. [Karma Jasmine Test Documentation](https://karma-runner.github.io)
