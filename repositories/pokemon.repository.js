const Pokemon = require('../models/pokemon.model');

class PokemonRepository {
    constructor() {
        this.pokemons = [];
        this.currentId = 1;
    }

    create(name, type, level, trainerId) {
        const pokemon = new Pokemon(this.currentId++, name, type, level, trainerId);
        this.pokemons.push(pokemon);
        return pokemon;
    }

    findAll() {
        return this.pokemons;
    }

    findById(id) {
        return this.pokemons.find(pokemon => pokemon.id === parseInt(id));
    }

    findByTrainerId(trainerId) {
        return this.pokemons.filter(pokemon => pokemon.trainerId === trainerId);
    }

    update(id, data) {
        const index = this.pokemons.findIndex(pokemon => pokemon.id === parseInt(id));
        if (index === -1) return null;

        this.pokemons[index] = { ...this.pokemons[index], ...data };
        return this.pokemons[index];
    }

    delete(id) {
        const index = this.pokemons.findIndex(pokemon => pokemon.id === parseInt(id));
        if (index === -1) return false;

        this.pokemons.splice(index, 1);
        return true;
    }
}

module.exports = PokemonRepository;
