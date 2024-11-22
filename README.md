# Todo Pro

Todo Pro is a Todo App that helps you manage tasks efficiently by organizing them into projects. With Todo Pro, you can create, edit, and track todos while seamlessly managing your projects.

### Demo

- Users who want a demo of Todo Pro can [click here](https://google.com)
- User who do not wish to create an account can use the guest account credentials given below
```bash
Username: guest_user
Password: Guest@123
```


---

## Features

- **User Registration and Login**:
  - Create an account with a unique username and password.
  - Secure authentication to access your todos and projects.

- **Project Management**:
  - Create new projects to group your tasks.
  - Edit project titles to keep your workspace organized.
  - Delete projects when they’re no longer needed.

- **Task Management**:
  - Add todos to a project with a descriptive title.
  - Edit todo descriptions as needed.
  - Mark todos as done to track progress.
  - Delete todos when completed or no longer relevant.

---

## Technology Stack

### **Frontend**
- **React JS**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For styling with ease and flexibility.

### **Backend**
- **Node.js with Express**: For building a robust REST API.
- **Prisma ORM**: For database interaction with type safety and simplicity.

### **Database**
- **PostgreSQL**: A powerful, open-source object-relational database.
- Hosted on **Supabase** for seamless database management.

---

## Installation and Setup

### Prerequisites
- **Node.js**: Install the latest version from [Node.js](https://nodejs.org/).
- **npm or yarn**: Comes with Node.js for dependency management.
- **PostgreSQL**: Ensure a PostgreSQL instance is running (or use Supabase).

### Clone the Repository
```bash
git clone https://github.com/yourusername/todo-pro.git
```

### Navigate to the repository
```bash
cd todo-pro
```

### Install the dependencies in the client 
```bash
cd todo-pro-client
npm install
```

### Install the dependencies in the server 
```bash
cd todo-pro-server
npm install
```

## Environment Variables
Developers can refer to the ***example.env*** files provided in both the server and client repositories to add their on ***.env*** files with custom values

### Starting up the client app for development
```bash
cd todo-pro-client
npm run dev
```

### Starting up the server for development
```bash
cd todo-pro-server
npm run start:dev
```

### The app should now be up and running at http://localhost:5173
