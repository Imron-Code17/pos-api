import { Options as SwaggerOptions } from "swagger-jsdoc";

const swaggerOptions: SwaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "POS API Documentation",
            version: "1.0.0",
            description: "API documentation generated automatically",
        },
        servers: [
            {
                url: "http://localhost:2000/api",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: []
            },
        ],
    },
    apis: [
        "./src/api/product/*.ts",
        "./src/api/category/*.ts",
        "./src/api/user/*.ts",
        "./src/api/transaction/*.ts",
    ],
};

export default swaggerOptions;
