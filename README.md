# Bodies in Motion OSC Chat Webapp

## Introduction

this webapp uses express as a node server

real-time chat communication between users is powered by socket.io

the server converts socket.io messages into OSC messages, which can be picked up by Unreal Engine or Max MSP for example.

## Prerequisites

* node.js
* express
* socket.io
* [web-osc](https://github.com/automata/osc-web)

## Install

```
npm i
```

## Run OSC

```
node client-server.js
```
( automatically connects to heroku server )

## Run Server Locally

```
npm start
```
( need to swap line 11 & 12, one or other )
```
var ioClient = ioc.connect('https://bim-chat.herokuapp.com'); // don't need a port for heroku!! / online servers
// var ioClient = ioc.connect('http://localhost:' + ioPort ); // for local testing
```
