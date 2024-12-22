import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
};

const findCategoryById = async (id: number) => {
    const category = await prisma.category.findUnique({
        where: { id },
    });
    return category;
};

const insertCategory = async (name: string) => {
    const category = await prisma.category.create({
        data: {
            name,
        },
    });
    return category;
};

const updateCategory = async (id: number, name: string) => {
    const category = await prisma.category.update({
        where: { id },
        data: {
            name,
        },
    });
    return category;
};

const deleteCategory = async (id: number) => {
    const category = await prisma.category.delete({
        where: { id },
    });
    return category;
};

export { findAllCategories, findCategoryById, insertCategory, updateCategory, deleteCategory };