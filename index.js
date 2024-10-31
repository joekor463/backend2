"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import express, { Request, Response } from 'express'
var express = require("express");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/samurai', function (req, res) {
    res.send('Hello Samurai!!!!');
});
app.post('/samurai', function (req, res) {
    res.send('We have created Samurai!');
});
app.listen(port, function () {
    console.log("Example app listening on port : ".concat(port));
});
