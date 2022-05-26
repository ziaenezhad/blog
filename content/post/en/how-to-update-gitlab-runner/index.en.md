---
title: How to update Gitlab Runners?
slug: how-to-update-gitlab-runner
image: cover.jpg
description: One of my colleagues asked me to update one of the Gitlab runners who had an older version yesterday. In this article, I will share how I did this update with you.
tags: [
  "Gitlab",
  "CI/CD",
]
categories: [
  "DevOps"
]
---

## Introduction

GitLab Runner is an application that works with GitLab CI/CD to run jobs in a pipeline. GitLab Runner is open-source and written in Go. It can be run as a single binary; no language-specific requirements are needed.

## How to update?

### Stop the service

```javascript
sudo gitlab-runner stop
```

### Download the binary to replace the GitLab Runner executable

We can see the list of all releases in the [Official Gitlab Runner](https://gitlab.com/gitlab-org/gitlab-runner/-/releases) repository.

In this case I had an Ubuntu machine and wanted to update to the latest `v14.x` machine. so the proer version is `v14.8.3`.

```javascript
sudo curl -L --output /usr/local/bin/gitlab-runner "https://gitlab-runner-downloads.s3.amazonaws.com/v14.8.3/binaries/gitlab-runner-linux-amd64"
```

### Setting permissions to execute

```javascript
sudo chmod +x /usr/local/bin/gitlab-runner
```

### Starting the service

```javascript
sudo gitlab-runner start
```

Done 🙂