FROM node:20.14.0 AS build
WORKDIR /app

ARG VITE_REACT_APP_API_URL
ARG VITE_REACT_APP_TOKEN_NAME

ENV VITE_REACT_APP_API_URL=${VITE_REACT_APP_API_URL}
ENV VITE_REACT_APP_TOKEN_NAME=${VITE_REACT_APP_TOKEN_NAME}


COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Set the environment variable for the port
ENV VITE_PORT=8080

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
