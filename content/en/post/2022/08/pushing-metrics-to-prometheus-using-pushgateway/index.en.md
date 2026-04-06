---
title: Pushing metrics to Prometheus using Pushgateway
date: 2022-08-07
image: cover.jpg
description: Prometheus scrapes data from your applications and services at regular intervals. but what if those intervals are still too slow to capture valuable information? Or maybe what if the source doesn't have a valid address to scrape by Prometheus, then we will need to send metrics from the source instead.

tags: [
  "Docker",
  "Prometheus",
  "Grafana",
  "Pushgateway",
  "Monitoring"
]
categories: [
  "System Admin"
]
---

## Introduction

### Prometheus

[Prometheus](https://prometheus.io/) is a metrics engine that ingest data and lets query them in order to get data aggregations and statistics.
It stores metrics inside a time series database and persists them on local disk.
Through the dashboard, we can get all the values collected by Prometheus and makes different aggregations.

The Prometheus server, which acts as the system’s “brain” by collecting various metrics and storing them in a time-series database. Unlike other systems monitoring tools that wait passively to receive information, Prometheus actively scrapes metrics from applications and services (e.g. Docker containers) at designated intervals using the Prometheus client libraries.

### Grafana

Beside of Prometheus, for displaying metrics and data in a human-readable format. In addition to native Prometheus visualization, many Prometheus users integrate the tool with [Grafana](https://grafana.com/), an open-source web application for analytics and data visualization.

Grafana enables you to query, visualize, alert on, and explore your metrics, logs, and traces wherever they are stored. Grafana provides you with tools to turn your time-series database (Prometheus in this case) data into insightful graphs and visualizations.

### Pushgateway

As discussed above, Prometheus scrapes data from your applications and services at regular intervals. but what if those intervals are still too slow to capture valuable information? Many short-lived and batch jobs complete so quickly that their lifespans are shorter than the Prometheus scrape interval itself, making it tricky or impossible to capture metrics from them at runtime.

Or maybe what if the source doesn't have a valid address to scrape by prometheus, then we will need to send metrics from the source instead.

[Prometheus](https://github.com/prometheus/pushgateway) Pushgateway sounds like a tremendously useful tool for capturing data from jobs that are difficult to scrape.

## Setup using Docker Compose

> 💡 You can find the source code in [the Github repository](https://github.com/ziaenezhad/prometheus-stack)

1. Create the working directory

```shell
mkdir ./prometheus-stack
cd ./prometheus-stack
```

2. Create the `docker-compose.yml`

```yaml
version: '3.7'

volumes:
  prometheus-data:
  grafana-data:

services:
  ###########################################################
  ## PROMETHEUS
  ###########################################################
  prometheus:
    image: prom/prometheus:v2.30.3
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus-data:/prometheus
    command: --web.enable-lifecycle  --config.file=/etc/prometheus/prometheus.yml
    ports:
      - 3000:9090
  ###########################################################
  ## Push Gateway
  ###########################################################
  pushgateway:
    image: prom/pushgateway:v1.4.3
    container_name: pushgateway
    restart: unless-stopped
    ports:
      - 3001:9091
  ###########################################################
  ## GRAFANA
  ###########################################################
  grafana:
    image: grafana/grafana-enterprise:8.2.0
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=strong-password
    volumes:
      - grafana-data:/var/lib/grafana
    ports:
      - 3002:3000
  
```

3. Create the Promethus config file

```shell
mkdir promethus
cd promethus
```

And make this file within the directory:

```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 10s
  scrape_timeout: 10s

scrape_configs:
  - job_name: services
    metrics_path: /metrics
    static_configs:
      - targets:
          - pushgateway:9091
```

4. Deploy the `docker-compose.yml` file

```shell
docker-compose pull
docker-compose up -d
```

5. Now you must have the enpoints up and running. Lets test and make sure:

* Prometheus: [http://localhost:3000](http://localhost:3000)
* Pushgateway: [http://localhost:3001](http://localhost:3001)
* Grafana: [http://localhost:3002](http://localhost:3002)

## Sending metrics to Pushgateway

We can send metrics to Pushgateway using http requests. for a simple one we can `POST` to the endpoin in this format:

```
http://localhost:3001/metrics/job/<JOB_NAME>{/<LABEL_NAME>/<LABEL_VALUE>}
```

### Using cURL

```shell
echo "temp_celsius 24.5\n humidity_ratio 0.3" | curl --data-binary @- http://localhost:3001/3001/metrics/job/job_01/site/greenhouse_01

```

### Using Axiso in Javascript

```javascript
import axios from 'axios';

const res = await axios({
  url: 'http://localhost:3001/3001/metrics/job/job_01/site/greenhouse_01',
  method: 'POST',
  data: `
    # Temperature
    temp_celsius 12
    # Percent
    humidity_ratio 0.3
    `,
});
```

Done 🙂
