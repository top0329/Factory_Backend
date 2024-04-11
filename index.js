const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/api');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define Routes
app.use('/api/blueprint', router.blueprint);
app.use('/api/my-blueprint', router.myBlueprint);
app.use('/api/component', router.component);
app.use('/api/product', router.product);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on the port ${port}`));
