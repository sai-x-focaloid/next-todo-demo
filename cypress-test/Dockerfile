FROM cypress/base:10.22.0

RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify

CMD [ "node_modules/.bin/cypress", "run" ]
