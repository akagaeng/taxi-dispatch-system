const { v4: uuidV4 } = require('uuid');
const createError = require('http-errors');

exports.createError = createError;

exports.generateId = () => uuidV4();
