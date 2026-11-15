# Base MongoDB image
FROM mongo:7

# Default database name
ENV MONGO_INITDB_DATABASE=prison_db

# Copy initialization script (automatically executed on first container start)
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose default MongoDB port
EXPOSE 27017

