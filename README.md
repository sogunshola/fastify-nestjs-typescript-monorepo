# Monorepo Fastify-NestJS Project

This repository demonstrates a scalable **monorepo** project using **NestJS with the Fastify adapter**. The setup is designed for high-performance applications with features like database integration (via Prisma and PostgreSQL), authentication (using JWT), and role-based authorization. It includes modular packages for API and shared utilities.

## Features
- **Fastify** as the HTTP server for better performance.
- **Monorepo structure** with Yarn Workspaces.
- **Prisma ORM** for database interactions.
- JWT-based authentication and role-based authorization.
- File upload and real-time notifications (WebSockets).
- Modular design for scalability and maintainability.

---

## Project Structure
- **`api`**: NestJS application with Fastify adapter.
- **`shared`**: Shared utilities and services.

## Features
- **`api`**
- **`auth`**: Authentication and authorization.
- **`common`**: Common utilities and services.
- **`config`**: Configuration files.
- **`database`**: Database setup and Prisma integration.
- **`notifications`**: Real-time notifications using WebSockets.
- **`uploads`**: File upload and storage (using cloudinary).

## Installation
1. Clone the repository.
2. Install dependencies: `yarn install`.
3. Copy `.env.example` to `.env` and configure the environment variables in the `api` package.
4. Run database migrations: `yarn workspace @monorepo/api prisma migrate dev`.
5. Start the development server: `yarn workspace @monorepo/api start:dev`.

## Usage
- **API**: `http://localhost:3000/`.
- **Swagger UI**: `http://localhost:3000/swagger`.

## Testing
- Run tests: `yarn workspace @monorepo/api test`.
