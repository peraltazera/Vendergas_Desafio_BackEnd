require('dotenv').config();
const express = require("express");
const loaders = require("./apps/configs/loaders");
const routes = require("./apps/routes/routes");
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)
loaders.start();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is on in port ${PORT}`)
});