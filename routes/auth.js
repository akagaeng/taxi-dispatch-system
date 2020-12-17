const express = require('express');
const {verifyToken} = require('../libs/middleware');

const router = express.Router();
const auth = require('./auth.controller');


/**
 * POST /auth/join
 *
 * @swagger
 * /auth/join:
 *   post:
 *     summary: Join(sign up) user & issue JWT token
 *     description: Join
 *     tags:
 *       - auth
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create (sign up) & issue JWT token
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: 'new@test.com'
 *             password: 'qwer1234'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 */
router.post('/join', auth.join);

/**
 * POST /auth/login
 *
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login existing user
 *     description: Login
 *     tags:
 *       - auth
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Check if login for existing user
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: 'test@test.com'
 *             password: 'qwer1234'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 */
router.post('/login', auth.login);

module.exports = router;
