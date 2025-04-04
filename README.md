# Task Vault Frontend

Task Vault is a React application for managing your daily tasks, with a clean user interface and responsive design.

## Features

- **User Authentication**
  - Register new user accounts
  - Login with secure authentication
  - Password reset functionality
  - User profile management
- **Todo Management**
  - Create, read, update, and delete todos
  - Mark todos as complete/incomplete
  - Set due dates for todos
  - Sort and filter todos by different criteria
- **UI/UX Features**
  - Responsive design for desktop and mobile
  - Intuitive user interface

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installing

1. Clone the repository

   ```sh
   git clone https://github.com/malintha-induwara/task-vault.git
   cd task-vault
   ```

2. Install dependencies

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```sh
   cp .env.example .env
   ```
   Edit the `.env` file and fill in the required values:
   - `VITE_API_URL`: Backend API URL

### Running the Application

#### Development mode

```sh
npm run dev
# or
yarn dev
```

#### Production build

```sh
npm run build
npm run preview
# or
yarn build
yarn preview
```

## Tech Stack

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

## Backend Repository

The backend repository for this project can be found here:
[Task Vault Backend](https://github.com/malintha-induwara/task-vault-backend)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
