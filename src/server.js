require('dotenv').config();
const express = require("express");
const loaders = require("./apps/configs/loaders");

const app = express();

app.use(express.json());
loaders.start();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is on in port ${PORT}`)
});