FROM node:14-alpine AS builder
ENV NODE_ENV development
# Add a work directory
WORKDIR /app

# Copy app files
COPY . .

RUN yarn

# Build the app
RUN yarn run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]