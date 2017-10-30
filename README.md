# Bodies in Motion OSC Chat Webapp

## Introduction

this webapp uses express as a node server

real-time chat communication between users is powered by socket.io

the server converts socket.io messages into OSC messages, which can be picked up by Unreal Engine or Max MSP for example.

## Prerequisites

* node.js
* express
* socket.io
* [web-osc] (https://github.com/automata/osc-web)

## Install

```
npm i
npm start
```
