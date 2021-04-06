import winston from 'winston';
const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
    ]
});

export default logger