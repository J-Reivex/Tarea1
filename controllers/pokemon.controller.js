

class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }

    getAllPokemons(req, res) {
        try {
            const pokemons = this.pokemonService.getAllPokemons();
            res.json(pokemons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getPokemonById(req, res) {
        try {
            const pokemon = this.pokemonService.getPokemonById(req.params.id);
            res.json(pokemon);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    getTrainerPokemons(req, res) {
        try {
            const pokemons = this.pokemonService.getTrainerPokemons(req.user.id);
            res.json(pokemons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createPokemon(req, res) {
        try {
            const pokemon = this.pokemonService.createPokemon(req.body, req.user.id);
            res.status(201).json(pokemon);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updatePokemon(req, res) {
        try {
            const pokemon = this.pokemonService.updatePokemon(
                req.params.id,
                req.body,
                req.user.id
            );
            res.json(pokemon);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deletePokemon(req, res) {
        try {
            const result = this.pokemonService.deletePokemon(req.params.id, req.user.id);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Pokemon not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PokemonController;
