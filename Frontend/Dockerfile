FROM node:alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the Frontend files
COPY /. .

# Command to run the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
