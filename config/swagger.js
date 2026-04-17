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
      }
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '69e129bf4026184c78eb08ad' },
            title: { type: 'string', example: 'Learn Node.js' },
            completed: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;