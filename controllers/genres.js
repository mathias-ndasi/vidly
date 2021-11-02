const router = require('express').Router();
let genres = [
    {
        id: 1,
        name: 'action',
    },
    {
        id: 2,
        name: 'cartoon',
    }
]

// Get all genres
router.get('/', (req, res) => {
    res.send(genres);
})

// Get a single genre
router.get('/:genreId', (req, res) => {
    // find out if given genre exist.
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId));

    if (!genre) return res.status(404).send(`Genre with id=${req.params.genreId} is not found.`)

    // if exist, reture genre object.
    res.send(genre);
})

// create a new genre
router.post('/', (req, res) => {
    // create new genre.
    let existingGenreIds = []
    genres.forEach(genre => existingGenreIds.push(genre.id));

    const genre = {
        'id': (Math.max(...existingGenreIds) + 1),
        'name': req.body.name,
    }

    // routerend results
    genres.push(genre);

    res.status(201).send(genre);
})

// Update a single genre
router.put('/:genreId', (req, res) => {
    // find out if given genre exist.
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId));
    if (!genre) return res.status(404).send(`Genre with id=${req.params.genreId} is not found.`)

    // update genre
    genre.name = req.body.name;

    res.send(genre);
})

// Delete a genre
router.delete('/:genreId', (req, res) => {
    // find out if given genre exist.
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId));
    if (!genre) return res.status(404).send(`Genre with id=${req.params.genreId} is not found.`)

    const genreIndex = genres.indexOf(genre);

    // delete genre
    genres.splice(genreIndex, 1);

    res.send('Genre successfully deleted.');
})

module.exports = router;