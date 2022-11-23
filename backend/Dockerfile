FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app

# Copy app files
COPY . .

RUN npm install

CMD ["npm", "start"]