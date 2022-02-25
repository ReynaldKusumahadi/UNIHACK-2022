const Gun = require('gun');

const path = require('path');
const express = require('express');
const Gun = require('gun');

const app = express();
const port = (process.env.PORT || 8080);
app.use(Gun.serve);
const server = app.listen(port);
Gun({ file: 'db/data.json', web: server });