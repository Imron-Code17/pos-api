import express from "express";
import productController from "../api/product/productController";
import categoryController from "../api/category/categoryController";
import userController from "../api/user/userController";

const routes = (app: express.Application) => {
    app.use("/api/products", productController);
    app.use("/api/categories", categoryController);
    app.use("/api/users", userController);
};

export default routes;
