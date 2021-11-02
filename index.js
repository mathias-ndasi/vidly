const express = require("express")
const config = require("config")
const morgan = require('morgan');
// const mongoose = require("mongoose")
const helmet = require("helmet");
const genreRoutes = require('./controllers/genres')
const genresMiddleware = require("./middleware/genres");
const mongoose = require('mongoose');

const app = express()
const port = config.get("PORT")

// Connect to mongodb
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connection to database was successful.'))
    .catch(error => console.error('Error connecting to database', error));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(genresMiddleware);

// controllers
app.use('/api/genres', genreRoutes)


app.listen(port, () => `Server listening to ${port}`)
