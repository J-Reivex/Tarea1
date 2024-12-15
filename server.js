const express = require('express');

// Repositories
const UserRepository = require('./repositories/user.repository');
const PokemonRepository = require('./repositories/pokemon.repository');

//Services
const AuthService = require('./services/auth.service');
const PokemonService = require('./services/pokemon.service');

//Controllers
const AuthController = require('./controllers/auth.controller');
const PokemonController = require('./controllers/pokemon.controller');

const app = express();

//Repositories
const userRepository = new UserRepository();
const pokemonRepository = new PokemonRepository();

//Services
const authService = new AuthService(userRepository);
const pokemonService = new PokemonService(pokemonRepository);

//Controllers
const authController = new AuthController(authService);
const pokemonController = new PokemonController(pokemonService);

//Middleware
app.use(express.json());

//Routes
app.use('/auth', require('./routes/auth.routes')(authController));
app.use('/pokemon', require('./routes/pokemon.routes')(pokemonController));

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

