---
title: Nexus Dynamic Docker Routing
description: Learn how to build Nexus, a DIY dynamic Docker routing system for reverse proxy and container management. A hands-on guide for Docker enthusiasts looking to explore container orchestration.
slug: nexus-dynamic-docker-routing
date: 02/10/2024
author: Rithend Sushanth
image: https://www.docker.com/wp-content/uploads/2022/12/Docker-Temporary-Image-Social-Thumbnail-1200x630-1.png
---


Hey Docker enthusiasts! Today, we're diving into Nexus, a DIY dynamic Docker routing system I built to learn more about container orchestration. If you've ever wondered how tools like Traefik work under the hood, you're in for a treat. Let's get our hands dirty!

## What We're Building

Nexus is a reverse proxy and container management system that:

- Routes traffic to Docker containers based on subdomains
- Listens to Docker events in real-time
- Automatically discovers and registers new containers
- Supports WebSocket connections
- Provides a simple API for container management

## Prerequisites

- Docker installed on your machine
- Node.js (v14 or later)
- Basic understanding of Express.js and Docker concepts

## Step 1: Project Setup

First, let's set up our project structure:

```bash
mkdir nexus-docker-routing
cd nexus-docker-routing
npm init -y
```

Now, install the necessary dependencies:

```bash
npm install express http-proxy dockerode
npm install --save-dev nodemon @types/express @types/http-proxy @types/dockerode
```

## Step 2: Creating the Main Script

Create an `index.js` file in your project root. This will be the heart of our Nexus system.

Let's start with the imports and initial setup:

```javascript
const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const proxy = httpProxy.createProxyServer({ changeOrigin: true, ws: true });
const db = new Map();

// Error handling for the proxy
proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end('Bad gateway.');
});
```

## Step 3: Implementing Docker Event Listening

Next, let's add the code to listen for Docker events:

```javascript
docker.getEvents((err, stream) => {
    if (err) {
        console.error('Error in getting events:', err);
        return;
    }

    stream.on('data', async (chunk) => {
        if (!chunk) return;

        try {
            const event = JSON.parse(chunk.toString());

            if (event.Type === 'container' && event.Action === 'start') {
                const containerId = event.Actor.ID;
                // ... (container inspection and registration logic)
            }
        } catch (parseError) {
            console.error("Error parsing event data:", parseError);
        }
    });
});
```

## Step 4: Setting Up the Reverse Proxy

Now, let's implement the reverse proxy functionality:

```javascript
const reverseProxyApp = express();

reverseProxyApp.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    console.log(`Received request for hostname: ${hostname}, subdomain: ${subdomain}`);

    if (!db.has(subdomain)) {
        return res.status(404).json({
            status: 'error',
            message: 'Container not found',
        });
    }

    const { target } = db.get(subdomain);

    console.log(`Forwarding request to ${target}`);

    proxy.web(req, res, { target }, (err) => {
        console.error('Proxy web error:', err.message);
        res.status(502).send('Bad gateway.');
    });
});

const reverseProxyServer = http.createServer(reverseProxyApp);
```

## Step 5: Adding WebSocket Support

To handle WebSocket connections:

```javascript
reverseProxyServer.on('upgrade', (req, socket, head) => {
    const hostname = req.headers.host;
    if (!hostname) {
        console.warn('Upgrade request without hostname');
        socket.end('HTTP/1.1 400 Bad Request\\r\\n\\r\\n');
        return;
    }

    const subdomain = hostname.split('.')[0];
    // ... (WebSocket upgrade logic)
});
```

## Step 6: Creating the Management API

Let's add a simple API to manage containers:

```javascript
const managementAPI = express();
managementAPI.use(express.json());

managementAPI.post('/container', async (req, res) => {
    const { image, tag } = req.body;
    // ... (container creation logic)
});

managementAPI.listen(8080, () => {
    console.log('Management API listening on port 8080');
});
```

## Step 7: Setting Up Docker Compose

Create a `docker-compose.yml` file in your project root:

```yaml
name: reverse-proxy

services:
  reverse-proxy:
    build:
      context: .
      dockerfile: Dockerfile.dev
    command: npm run dev
    ports:
      - "8080:8080"
      - "80:80"
    network_mode: bridge
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - .:/app
```

## Step 8: Creating a Dockerfile

Create a `Dockerfile.dev` for development:

```dockerfile
FROM node:alpine3.10
WORKDIR /app
```

## Step 9: Running Nexus

1. Start the Nexus system:

```bash
docker-compose up --build
```

2. Use the Management API to create a new container:

```bash
curl -X POST http://localhost:8080/container \\
     -H "Content-Type: application/json" \\
     -d '{"image": "nginx", "tag": "latest"}'
```

3. Access your container using the subdomain:  
Open your browser and visit `http://[container-name].localhost`

## Conclusion

And there you have it! We've built a basic version of Nexus, a dynamic Docker routing system. This project has taught me a ton about Docker, networking, and real-time event handling. It's far from perfect, but it's a great starting point for understanding how tools like Traefik work behind the scenes.

Feel free to experiment, add features, or optimize the code.