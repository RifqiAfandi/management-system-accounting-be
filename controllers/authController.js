const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

async function createUser(req, res) {
    try {
        const { name, username, password } = req.body;

        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Username already exists',
                isSuccess: false,
                data: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            name,
            username,
            password: hashedPassword,
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            isSuccess: true,
            data: { newUser }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function login(req, res) {
    try {
        const { username, email, password } = req.body;
        
        // Allow login with either username or email
        const loginField = email || username;
        
        if (!loginField || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email/username and password are required'
            });
        }

        const user = await Users.findOne({ 
            where: { 
                username: loginField 
            } 
        });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { 
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getAllUser(req, res) {
    try {
        const users = await Users.findAll();
        if (users.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No users found',
                isSuccess: false,
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            isSuccess: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                isSuccess: false,
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User retrieved successfully',
            isSuccess: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, username, password } = req.body;

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                isSuccess: false,
                data: null
            });
        }

        const updateData = {
            name,
            username,
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        await user.update(updateData);

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            isSuccess: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                isSuccess: false,
                data: null
            });
        }

        await user.destroy();

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            isSuccess: true,
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

module.exports = {
    createUser,
    login,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};