const User = require('../models/user.model');

class UserRepository {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    create(username, password) {
        const user = new User(this.currentId++, username, password);
        this.users.push(user);
        return user;
    }

    findByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    findById(id) {
        return this.users.find(user => user.id === id);
    }
}

module.exports = UserRepository;
