FROM nginx

COPY dist /usr/share/nginx/html
COPY docker/nginx-default.conf.template /etc/nginx/conf.d/
COPY docker/run.sh /run.sh

CMD ["/bin/sh", "/run.sh"]
