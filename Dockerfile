FROM node

# Copy common stuff
WORKDIR /usr/src/common
ADD common/ /usr/src/common/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./.env /usr/src
COPY backend/package*.json /usr/src/app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY backend /usr/src/app/

EXPOSE 8080

# Only for testing purposes
# RUN npx sequelize-cli db:migrate:undo:all

# Migration
# RUN [ "npx", "sequelize-cli", "db:migrate" ]
# RUN [ "npx", "sequelize-cli", "db:seed:all" ]

# ENTRYPOINT [ "npm", "start" ]

# CMD [ "node", "start"  ]
RUN [ "npm", "run", "db:migrate:all" ]
RUN [ "npm", "run", "db:seed:all" ]
CMD ["npm", "run", "start" ]
# ENTRYPOINT [ "node", "--es-module-specifier-resolution=node", "dist/backend/src/index.js" ]

# Removing possible \r in files edited with windows
#RUN sed -i 's/\r//g' ./docker-entrypoint.sh
#RUN chmod +x ./docker-entrypoint.sh

# Removing possible \r in files edited with windows
#RUN sed -i 's/\r//g' ./wait-for-it.sh
#RUN chmod +x ./wait-for-it.sh

# ENTRYPOINT [ "/bin/bash", "-c" ]
# CMD ["./wait-for-it.sh" , "db:3306" , "--timeout=0" , "--" , "/docker-entrypoint.sh"]
# CMD ["./wait-for-it.sh" , "db:3306" , "--strict" , "--timeout=300" , "--" , "/docker-entrypoint.sh"]

# To keep container running in openshift.
# To make it work in openshift is necessary from the terminal to run /docker-entrypoint.sh
#CMD tail -f /dev/null















# # Usa la imagen oficial de Node.js
# FROM node:18-alpine

# # Configura el directorio de trabajo
# WORKDIR /usr/src/common
# ADD common/ /usr/src/common/
# WORKDIR /usr/src/app

# # Copia package.json y package-lock.json para instalar dependencias
# COPY backend/package*.json ./

# # Instala las dependencias
# RUN npm install

# # Copia el resto del código de la aplicación
# COPY backend/ ./

# # Expone el puerto que usará la aplicación
# EXPOSE 8080

# # Comando de inicio
# CMD ["npm", "start"]
