# Router Utils

This repository contains the `router_utils` service which can be run using Docker Compose. The service is configured to run on port 5000 and is part of a local network defined in the Docker Compose configuration.


## Prerequisites

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)


### Example Docker Compose

Here's the example `docker-compose.yml` configuration used for this project:

```yaml
version: "3.8"

services:
  router_utils:
    image: ghcr.io/itscharukadeshan/router_utils:latest
    ports:
      - "5000:5000"
    networks:
      - local_network

networks:
  local_network:
    driver: bridge

```

### Pulling the Docker Image

To pull the Docker image from GitHub Packages, use the following command:

```yaml

docker pull ghcr.io/<YOUR_GITHUB_USERNAME>/router_utils:latest

```
