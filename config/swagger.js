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
  },
  {
    url: 'http://localhost:5000',
    description: 'Local server',
  }
],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '69e2e1091ca70e9f4473d197' },
            title: { type: 'string', example: 'Buy groceries' },
            completed: { type: 'boolean', example: false },
            user: { type: 'string', example: '69e2b9cc081b56370c8ec6d8' },
            createdAt: { type: 'string', example: '2026-04-18T01:40:25.107Z' },
            updatedAt: { type: 'string', example: '2026-04-18T01:40:25.107Z' }
          }
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