const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on the port ${port}`));
