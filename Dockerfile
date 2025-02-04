FROM node

# Copy common stuff
WORKDIR /usr/src/common
ADD common/ /usr/src/common/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
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