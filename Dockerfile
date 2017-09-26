FROM nginx

COPY dist /usr/share/nginx/html
COPY deploy/docker/nginx-default.conf.template /etc/nginx/conf.d/
COPY deploy/docker/run.sh /run.sh

CMD ["/bin/sh", "/run.sh"]
