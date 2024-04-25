# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies in the root
RUN yarn install --frozen-lockfile

# Build your Next.js application
RUN yarn workspace web build

# Start the application
CMD ["yarn", "workspace", "web", "start"]
