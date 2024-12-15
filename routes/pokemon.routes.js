const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

function pokemonRoutes(pokemonController) {
    const router = express.Router();

    // Rutas públicas
    router.get('/', (req, res) => pokemonController.getAllPokemons(req, res));
    router.get('/:id', (req, res) => pokemonController.getPokemonById(req, res));

    // Rutas protegidas
    router.get('/trainer/mypokemons', 
        authMiddleware, 
        (req, res) => pokemonController.getTrainerPokemons(req, res)
    );

    router.post('/', 
        authMiddleware, 
        (req, res) => pokemonController.createPokemon(req, res)
    );

    router.put('/:id', 
        authMiddleware, 
        (req, res) => pokemonController.updatePokemon(req, res)
    );

    router.delete('/:id', 
        authMiddleware, 
        (req, res) => pokemonController.deletePokemon(req, res)
    );

    return router;
}

module.exports = pokemonRoutes;
