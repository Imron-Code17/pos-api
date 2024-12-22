import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
};

const findProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    });
    return product;
};

const findProductByCategory = async (categoryId: number) => {
    const product = await prisma.product.findMany({
        where: { categoryId }
    });
    return product;
}

const insertProduct = async (
    name: string,
    price: number,
    stock: number,
    categoryId: number
) => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            stock,
            categoryId,
        },
    });
    return product;
};

const updateProduct = async (
    id: number,
    name: string,
    price: number,
    stock: number,
    categoryId: number
) => {
    const product = await prisma.product.update({
        where: { id },
        data: {
            name,
            price,
            stock,
            categoryId,
        },
    });
    return product;
};

const deleteProduct = async (id: number) => {
    const product = await prisma.product.delete({
        where: { id },
    });
    return product;
};

export {
    findAllProducts,
    findProductById,
    findProductByCategory,
    insertProduct,
    updateProduct,
    deleteProduct,
};
