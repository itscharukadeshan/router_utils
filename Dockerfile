# Step 1: Use an official Node.js runtime as the base image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Vite app for production
RUN npm run build

# Step 7: Install a simple static file server to serve the built files
RUN npm install -g serve

# Step 8: Set the environment variable for serving the app
ENV NODE_ENV=production

# Step 9: Expose the port that the app will run on
EXPOSE 5000

# Step 10: Command to run the app
CMD ["serve", "-s", "dist", "-l", "5000"]
