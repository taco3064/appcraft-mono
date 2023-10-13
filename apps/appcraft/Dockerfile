FROM nginx
ARG SERVICE_PROXY
RUN rm /etc/nginx/conf.d/default.conf
COPY apps/appcraft/nginx.conf /etc/nginx/conf.d
COPY dist/apps/appcraft/exported /usr/share/nginx/html