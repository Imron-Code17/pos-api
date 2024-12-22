import * as productRepository from "./productRepository";

const getAllProducts = async () => {
    const products = await productRepository.findAllProducts();
    return products;
};

const getProductById = async (id: number) => {
    const product = await productRepository.findProductById(id);
    return product;
};

const getProductByCategory = async (categoryId: number) => {
    const product = await productRepository.findProductByCategory(categoryId);
    return product;
}

const createProduct = async (
    name: string,
    price: number,
    stock: number,
    categoryId: number
) => {
    const product = await productRepository.insertProduct(name, price, stock, categoryId);
    return product;
};

const updateProduct = async (
    id: number,
    name: string,
    price: number,
    stock: number,
    categoryId: number
) => {
    const product = await productRepository.updateProduct(id, name, price, stock, categoryId);
    return product;
};

const deleteProduct = async (id: number) => {
    const product = await productRepository.deleteProduct(id);
    return product;
};

export {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
};
