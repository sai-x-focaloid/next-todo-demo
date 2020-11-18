FROM cypress/base:10.22.0

COPY ./cypress/ /cypress
COPY ./cypress.json /cypress.json

RUN ls

RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify

CMD [ "node_modules/.bin/cypress", "run" ]
