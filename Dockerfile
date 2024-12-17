# Use the official Node.js 20 image
FROM node:20

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Change ownership of the working directory
RUN chown -R node:node /home/node/app

# Switch to the node user
USER node

# Define the command to run your application
ENTRYPOINT ["node", "index.js"]
