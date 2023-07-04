# Choose the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy other files
COPY . .

# Expose the port which the app runs on
EXPOSE 3000

# Run the application
CMD ["yarn", "dev"]
