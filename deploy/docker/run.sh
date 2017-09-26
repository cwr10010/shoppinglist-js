#!/bin/env bash

# Substitute env vars
envsubst '$MY_API_URL' \
< /etc/nginx/conf.d/nginx-default.conf.template \
> /etc/nginx/conf.d/default.conf

# Start server
nginx -g 'daemon off;'
