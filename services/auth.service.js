const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.JWT_SECRET = 'your-secret-key';
    }

    async register(username, password) {
        const existingUser = this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create(username, hashedPassword);
    }

    async login(username, password) {
        const user = this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            this.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token, user };
    }
}

module.exports = AuthService;
