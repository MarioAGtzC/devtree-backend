import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevTree API',
      version: '1.0.0',
      description: 'REST API for DevTree, a "link-in-bio" service for developers: account registration/login, public profile management, and public profile lookup by username.',
    },
    tags: [
      { name: 'Auth', description: 'Account registration and login' },
      { name: 'User', description: 'Authenticated profile management' },
      { name: 'Public', description: 'Public, unauthenticated profile lookup' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            description: { type: 'string' },
            image: { type: 'string' },
            links: { type: 'string' },
          },
        },
        PublicUser: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            image: { type: 'string' },
            links: { type: 'string' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes').split(path.sep).join('/') + '/*.routes.{ts,js}'],
};

export const swaggerSpec = swaggerJsdoc(options);
