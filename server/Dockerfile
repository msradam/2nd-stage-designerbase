From node:10
RUN mkdir -p /srv/app/designerbase-server
WORKDIR /srv/app/designerbase-server

COPY package.json /srv/app/designerbase-server
COPY yarn.lock /srv/app/designerbase-server

RUN yarn

COPY . /srv/app/designerbase-server

CMD ["yarn", "run", "dev"]