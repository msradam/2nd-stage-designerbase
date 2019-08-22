FROM node:10
RUN mkdir -p /srv/app/designerbase-client
WORKDIR /srv/app/designerbase-client
COPY client/package.json /srv/app/designerbase-client
COPY client/yarn.lock /srv/app/designerbase-client
RUN yarn
COPY client/. /srv/app/designerbase-client
CMD ['yarn', 'start']

FROM node:10
RUN mkdir -p /srv/app/designerbase-server
WORKDIR /srv/app/designerbase-server
COPY server/package.json /srv/app/designerbase-server
COPY server/yarn.lock /srv/app/designerbase-server
RUN yarn
COPY server/. /srv/app/designerbase-server
CMD ['yarn', 'run', 'start']