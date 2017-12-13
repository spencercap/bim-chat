# Bodies in Motion OSC Chat Webapp

## Introduction

this webapp uses express as a node server

real-time chat communication between users is powered by socket.io

the 2nd server converts socket.io messages into OSC messages in node, which can be picked up by Unreal Engine or Max MSP for example.

## Prerequisites

* node.js
* express
* socket.io
* [node-osc](https://github.com/MylesBorins/node-osc)
* [web-osc](https://github.com/automata/osc-web) was using

## Install

```
npm i
```

## Run OSC

```
node client-server.js
```
( connects to heroku server )

```
node client-server-local.js
```
( connects to localhost server )

## Run Server Locally

```
npm start
```
