const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 5000;
const { urlencoded } = require('express')
const admin = require('./fbase/config');

const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: "false"}));

// router-modules
app.use('/api/users', require('./routes/users'));

// router
app.get('/', (req, res) => res.send('Hello World! It\'s Git-Meow API Server!'));

// Create an HTTP server 
app.listen(port, () => console.log(`Express server listening on port ${port}`)); 