// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A simple Todo REST API built with Node.js, Express, MongoDB & Zod',
    },
    servers: [
      {
        url: 'https://todo-api-9o2m.onrender.com',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
module.exports = specs;