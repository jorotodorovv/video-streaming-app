# Video Streaming App

This repository contains a video streaming application consisting of a client and a server. You can run the application using Docker Compose or bash scripts. Below are the instructions for both methods, including how to use the environment file.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

### Using Bash Scripts

1. **Build and Run the Application**

   You can build and run the application using the provided `build.sh` script. This script will build the Docker images and start the containers.

   ```bash
   ./build.sh
   ```

   This will use the `docker-compose.build.yml` file to build the images and start the services.

2. **Deploying the Application**

   If you want to deploy the application, you can use the `deploy.sh` script. This script logs into Docker and builds and pushes the images to the Docker registry.

   ```bash
   ./deploy.sh
   ```

### Using Docker Compose Directly

You can also run the application using Docker Compose commands directly.

1. **Build the Application**

   To build the application, run:

   ```bash
   docker compose -f docker-compose.build.yml build
   ```

2. **Run the Application**

   To run the application, execute:

   ```bash
   docker compose up
   ```

### Using the Environment File

The application uses an `.env` file to set environment variables for the server. This file contains sensitive information such as database URLs and API keys.

1. **With Environment File**

   Ensure that the `.env` file is present in the root directory. The application will automatically use the variables defined in this file when you run the Docker Compose commands.

2. **Without Environment File**

   If you prefer not to use the `.env` file, you can manually set the environment variables in your terminal before running the application. For example:

   ```bash
   export DATABASE_URL="file:./dev.db"
   export GOOGLE_KEY="your_google_key"
   export GOOGLE_CLIENT_ID="your_google_client_id"
   ```

   After setting the variables, you can run the application as described above.

## Accessing the Application

- The client application will be accessible at `http://localhost:3001`.
- The server application will be accessible at `http://localhost:3000`.

## Conclusion

You can choose to run the application using either the provided bash scripts or Docker Compose commands. Make sure to handle the environment variables appropriately based on your needs.