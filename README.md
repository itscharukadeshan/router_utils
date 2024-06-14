<!-- @format -->

# Router Utils

This repository contains the `router_utils` service which can be run using Docker Compose. The service is configured to run on port 5000 and is part of a local network defined in the Docker Compose configuration.

## Futures

- Allow restart hutch / dialog / slt ZLT s10 routers with one click.
- Bookmark or add to home screen when network unstable usage.

## Upcoming futures

- Dns change with one click ( not working or configured currently )

## Usage

- Navigate to the [Router_Utils](https://router-utils.vercel.app/) page.
- Click reboot dialog to restart dialog ZLT s10 router.
- Click reboot hutch to restart hutch / slt Zlt s10 routers.

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
