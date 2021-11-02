const Joi = require('joi');

module.exports = (req, res, next) => {
    // Validate request body for creating new genres.
    if (req.url === '/api/genres' && req.method === 'POST') {
        const schema = {
            name: Joi.string().min(3).required(),
        }

        const { error } = Joi.validate(req.body, schema);

        // Validate request body
        if (error) return res.status(400).send(error.details[0].message);
    }

    // Validate request body for updating a given genre.
    const route = req.url.split('/');
    const genreId = parseInt(route[route.length - 1]);

    if (req.url.includes('/api/genres') && req.method === 'PUT' && typeof genreId === 'number') {
        const schema = {
            name: Joi.string().min(3).required(),
        }

        const { error } = Joi.validate(req.body, schema);

        // Validate request body
        if (error) return res.status(400).send(error.details[0].message);
    }
    next();
} 