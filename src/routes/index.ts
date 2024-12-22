import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "../../src/config/doc/swaggerConfig";
import productController from "../api/product/productController";
import categoryController from "../api/category/categoryController";
import userController from "../api/user/userController";
import transactionController from "../api/transaction/transactionController";

const swaggerSpec = swaggerJsdoc(swaggerConfig);



const routes = (app: express.Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/api/products", productController);
    app.use("/api/categories", categoryController);
    app.use("/api/users", userController);
    app.use("/api/transactions", transactionController);
};

export default routes;
