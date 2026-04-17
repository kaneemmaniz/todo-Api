// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const serverUrl = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'todo-api-90o2m.onrender.com'}`
  : `http://localhost:${process.env.PORT || 5000}`;

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
        url: serverUrl,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token (Bearer <token>)'
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;