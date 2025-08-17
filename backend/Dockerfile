# --- Install production dependencies
FROM node:20-alpine AS deps
WORKDIR /app
ENV NODE_ENV=production
# Copy only manifest files to leverage layer caching
COPY package*.json ./
# Use lockfile if present; falls back to npm install
RUN npm ci --omit=dev || npm install --omit=dev

# --- Runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Bring in node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of your app (includes package.json for `npm start`)
COPY . .

# Make sure the non-root 'node' user can read everything
RUN chown -R node:node /app
USER node

EXPOSE 4000
CMD ["npm", "start"]
