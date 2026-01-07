# Stage 1: Build application
FROM node:22-alpine AS builder

# RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# COPY package.json ./
# COPY pnpm-lock.yaml ./

# RUN pnpm install --frozen-lockfile

# COPY . .
# ENV NODE_ENV=production
# RUN pnpm run build

COPY /dist/apps/customer/mad-purple ./

# Stage 2: Serve with Nginx
FROM nginx:1.29.4-alpine-slim AS production

COPY nginx-config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]