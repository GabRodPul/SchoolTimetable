# School Timetable

Really simple application to manage and check school timetables, built with ReactJS + Express + Sequelize + MySQL.

## First Approach
- We work with one of many approaches, having our backend and frontend separated, related through calls between them., although another option would be the approach of keeping them relatively close throughout the laragon.

## Backend
- Express + Sequelize + MySQL.
- Fully functioning CRUD.
- 100% TypeScript code.
- 9 fully functioning CRUDs. 

## Frontend
- WIP CRUD.
- Aesthetics inspired by other applications like Moodle.

## Project Info 

#### Roles
- In our project, we work with a variety of roles instead of having different tables in the database to perform that function. This makes certain aspects easier when working directly on the backend. These roles are: Student, which is the most basic and restricted; then Teacher, which, although it has some restrictions, provides greater access to the content, just like the next role, Head of Studies (Head); and finally, Admin, who is responsible for managing the application's information.
- In Sumary:

        . Student
        . Teacher
        . Head
        . Admin

#### Authentication vs Authorization
- Authentication verifies a user’s identity, ensuring they are who they claim to be, using credentials like passwords or multi-factor authentication. It answers the question: "Who are you?"

- Authorization determines what actions or resources an authenticated user can access, based on their roles or permissions. It answers the question: "What are you allowed to do?"
  
## Project Info 

### Folder Structure
  #### Backend
 The backend of the project is organized as follows:
- src: This is the source folder where the actual backend code is written. Inside src, there are several subdirectories:
-   - config: Contains configuration files for the project, such as environment settings or database connections.
-   - controllers: Includes the logic for handling incoming requests, managing responses, and coordinating between models and routes.
-   - models: Defines the data structures or schemas, often related to the database entities.
-   - routes: Contains the routing logic, mapping endpoints to their respective controllers.
-   - utils: Stores utility functions or helper methods that can be reused across the project.
-   - env.ts: Manages environment variables, such as API keys or database URLs.
-   - index.ts: The entry point of the backend application, where the server is initialized and configured.
-   - .gitignore: Specifies which files or directories Git should ignore, like node_modules or build files.
 
The frontend of the project is organized as follows
-   node_modules: Contains all the dependencies and packages installed via npm.
-   public: Stores static assets, such as images or external files, that do not require processing.
-  src: The main source code directory, which includes:
-  - - api: Handles API requests or connections to backend endpoints.
-  - - - assets: Stores static resources, such as images, fonts, or icons.
-  - - components: Includes reusable components (subfolders like "fonts" suggest organized static content).
-  - - - page: This folder likely contains the views or pages for the application.
-  - types: Defines TypeScript types and interfaces for the project, ensuring type safety and consistency.
- App.css: Main CSS file for styling the App component.
- App.tsx: The main App component, serving as the root of the React application.
- env.ts: Manages environment variables specific to the frontend.
- .gitignore: Specifies files and folders to exclude from version control.

## Instructions 🚀

### Prerequisites 📋

Prerequisites
- Git (for easy cloning).
- Node.js (I used v20.17.0).
- MySQL.
- A browser to visualise content.


### Installation 🔧

First, clone this repository.
```
git clone https://github.com/GabRodPul/SchoolTimetable.git
```

After that, install the backend.
```
cd backend/
npm install
```
And the frontend.
```
cd ../frontend
npm install
```
- In case that some dependencies doesn't install, here are some of the instances that we have problems with: 
```
npm install react-icons
```
```
npm install react-router-dom
```
```
npm install font-awesome
```
```
npm install react-fonts
```
```
npm install react-date-range
```

To start the backend, use:
```
npm start run
```

Finally, to start the frontend, use:
```
npm run dev
```

## Postman docs
You can find documentation about all endpoints [here](https://documenter.getpostman.com/view/23623831/2sAXxMfDJQ).

## Built with 🛠️
* [Express.js](https://expressjs.com/es/) - Backend web framework
* [Sequelize](https://sequelize.org/) - ORM
* [React](https://es.react.dev/) - React
* [MySQL](https://www.mysql.com/) - Database

## Authors ✒️
* **Daniel Yezid Roncancio García** - [DaniYezid](https://github.com/DaniYezid)
* **Daniel Matías Abel** - [Smosherty](https://github.com/Smosherty)
* **Gabriel Rodríguez Pulido** - [GabRodPul](https://github.com/GabRodPul)


## Special thanks 🎁

* TIBURCIO
* NIRA
* MIRIAM
* MIGUEL ÁNGEL
