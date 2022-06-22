---
title: Self hosted Sentry updating TODO list
date: 2022-06-22
image: cover.jpg
description: Sentry encourage everyone to regularly update their Sentry installations to get the best and the most recent Sentry experience. In this post I made my own Sentry updating todo list.
tags: [
  "Sentry",
  "DevOps",
  "Docker",
  "Ubuntu"
]
categories: [
  "System Admin"
]
---

In addition to making its source code available publicly, [Sentry](https://sentry.io/welcome/) offers and maintains a minimal setup that works out-of-the-box for simple use cases.

[Sentry](https://sentry.io/welcome/) encourage everyone to regularly update their [Sentry](https://sentry.io/welcome/) installations to get the best and the most recent [Sentry](https://sentry.io/welcome/) experience.

## Create a backeup/snapshot

Make Sure you have a quickly revertable backup/snapshot.

## Download the closer update

You have to update your [Sentry](https://sentry.io/welcome/) one by one, so you can't upgrade from `20.x` to `22.x` or some thing.

Also read the release notes carefully. some times there are more steps before updating to a release:

[https://github.com/getsentry/self-hosted/releases](https://github.com/getsentry/self-hosted/releases)

Supposing the next one is `21.9.0`:

```shell
wget -qO- https://github.com/getsentry/self-hosted/archive/refs/tags/21.9.0.tar.gz | tar xvz
```

## Change the permissions of all files & directories

### Directories

```shell
find ./self-hosted-21.9.0 -type d -exec chmod 777 {} \;
```

### Files

```shell
find ./self-hosted-21.9.0 -type f -exec chmod 777 {} \;
```

## Copy the config/env files to the new version directory

These are the config files. It's not bad to compare the old and new config files before moving, to make sure the formats are same.

* `sentry/config.yml`
* `sentry/sentry.conf.py`
* `.env`

## Run the installation script

```shell
sudo bash ./install.sh
```

## Start the services

```shell
docker-compose up -d
```

Done 🙂
