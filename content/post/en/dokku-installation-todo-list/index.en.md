---
title: Dokku Installation TODO list
date: 2022-06-18
image: cover.jpg
description: Dokku is an extensible, open source Platform as a Service that runs on a single server of your choi In this post I made my own Dokku installation todo list.
tags: [
  "Docker",
  "Dokku",
  "Ubuntu"
]
categories: [
  "System Admin"
]
---

## Prepare the requirements

* At least 1 GB of system memory
* A fresh installation of `Ubuntu 18.04/20.04/22.04`
* A domain pointing to the server ip will allow to add git remotes `dokku.my-domain.com`.
* A wildcard domain `*.dokku.my-domain.com` will allow access to apps via `$APP.dokku.my-domain.com`.

## Installation

```shell
wget https://raw.githubusercontent.com/dokku/dokku/v0.27.5/bootstrap.sh;
sudo DOKKU_TAG=v0.27.5 bash bootstrap.sh
```

## Post installation

### Allow authorized ssh keys to access dokku too

```shell
cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin
```

### Set global base domain

```shell
dokku domains:set-global dokku.my-domain.com
```

## Letsencrypt TLS certificates

`dokku-letsencrypt` is the official plugin for dokku that gives the ability to automatically retrieve and install TLS certificates from [letsencrypt.org](<https://letsencrypt.or> During ACME validation, your app will stay available at any time.

```shell
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

### Set global email

```shell
dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=your@email.tld
```

### Enable automatic certificate renewal

```shell
dokku letsencrypt:cron-job --add
```

## Postgres database setup

### Installation

```shell
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
```

### Creating the service

```shell
dokku postgres:create my-database
```

### Expose the port

Expose a postgres service on custom host:port to have access from out world:

```shell
dokku postgres:expose my-database 5432
```

You can now find the user/pass/post of the datbase this way:

```shell
dokku postgres:info my-database
```

## Deployment

### Creating an app

```shell
dokku apps:create my-app
```

### Set env variables

```shell
dokku config:set my-app JWT_SECRET=jwt-secret JWT_EXPIRES_IN=1d NODE_ENV=production ...
```

### Link postgres database to the app

```shell
dokku postgres:link my-database my-app
```

This will add the proper `DATABASE_URL` to the env variables of `my-app`.

### Add a git remote

```shell
git remote add dokku dokku@dokku.may-domain.com:my-app
```

### Push to Dokku

```shell
git push dokku
```

### Set the proxy port (for the Dockerised apps)

```shell
dokku proxy:ports-add my-app http:80:3000
```

### Enable Letsencrypt

```shell
dokku letsencrypt:enable my-app
```

Done 🙂
