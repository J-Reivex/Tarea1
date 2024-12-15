class User {
    constructor(id, username, password, role = 'trainer') {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;
