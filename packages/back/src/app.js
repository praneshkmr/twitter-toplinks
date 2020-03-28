import express from 'express';
// import bodyParser from 'body-parser';

const app = express();

app.get('/api/foo', (req, res) => res.json({ foo: 'bar' }));

module.exports = app;
