const { Router } = require('express');
// Importar todos los routers;
const genresRouter = require('./genresRouter')
const videogamesRouter = require('./videogamesRouter')


const router = Router();

// Configurar los routers
router.use('/genres', genresRouter)
router.use('/videogames', videogamesRouter)

module.exports = router;
