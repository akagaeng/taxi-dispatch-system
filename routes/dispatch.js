const express = require('express');
const {verifyToken, passengerOnly, driverOnly} = require('../libs/middleware');

const router = express.Router();
const dispatch = require('./dispatch.controller');


/**
 * GET /dispatch
 *
 * @swagger
 * /dispatch:
 *   get:
 *     summary: Get all dispatch list
 *     tags:
 *       - dispatch
 *     description:
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: 'Input contents count in list (default: 10)'
 *         required: false
 *         type: string
 *       - in: query
 *         name: page
 *         description: 'Input page to load (default: 1)'
 *         required: false
 *         type: string
 *       - in: query
 *         name: status
 *         description: 'Input staus to filter (waiting | finished)'
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 */
router.get('/', verifyToken, dispatch.getAll);

/**
 * POST /dispatch
 *
 * @swagger
 * /dispatch:
 *   post:
 *     summary: Dispatch Request from a passenger
 *     tags:
 *       - dispatch
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: dispatch
 *         description: Dispatch Request from a passenger
 *         schema:
 *           type: object
 *           required:
 *             - address
 *           properties:
 *             address:
 *               type: string
 *           example:
 *             address: 경기도 성남시 분당구 판교로 289번길
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 */
router.post('/', verifyToken, passengerOnly, dispatch.post);

/**
 * PUT /dispatch/:id
 *
 * @swagger
 * /dispatch/{id}:
 *   put:
 *     summary: Dispatch approval from a driver
 *     tags:
 *       - dispatch
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: dispatch
 *         description: Dispatch approval from a driver. Update status with dispatch.id
 *         schema:
 *           type: object
 *           required:
 *             - address
 *           properties:
 *             address:
 *               type: string
 *           example:
 *             address: 경기도 성남시 분당구 판교 현대백화점
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 */
router.put('/:id', verifyToken, driverOnly, dispatch.put);

module.exports = router;
