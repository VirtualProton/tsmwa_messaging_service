# ------------------------
# Stage 1: Builder
# ------------------------
FROM node:20-alpine AS builder

# Install build dependencies (needed for node-gyp & Prisma binary)
RUN apk add --no-cache python3 make g++ openssl

WORKDIR /src

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy full source code
COPY . .

# Generate Prisma client (important for Prisma 6)
# RUN npx prisma generate

# Build your TypeScript project
RUN npm run build

# Remove dev dependencies (keep only production)
RUN npm prune --production


# ------------------------
# Stage 2: Runtime
# ------------------------
FROM node:20-alpine

# Install OpenSSL runtime (required by Prisma)
RUN apk add --no-cache openssl

WORKDIR /src

# Copy only runtime essentials
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/package*.json ./
# COPY --from=builder /src/prisma ./prisma

# If you use Prisma in production, the client still needs schema + binaries
# RUN npx prisma generate

# EXPOSE 3500

# CMD ["node", "dist/index.js"]
CMD ["node", "dist/worker.js"]
