# === Development Stage ===
FROM node:16-alpine AS development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn workspace @monorepo/api prisma generate
RUN yarn workspace @monorepo/api prisma migrate dev
RUN yarn workspaces run build
CMD ["yarn", "workspace", "@monorepo/api", "start:dev"]

# === Production Stage ===
FROM node:16-alpine AS production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn workspace @monorepo/api prisma generate
RUN yarn workspace @monorepo/api prisma migrate dev
RUN yarn workspaces run build
CMD ["yarn", "workspace", "@monorepo/api", "start:prod"]