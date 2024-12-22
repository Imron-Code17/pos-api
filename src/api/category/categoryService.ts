import * as categoryRepository from "./categoryRepository";

const getAllCategories = async () => {
    const categories = await categoryRepository.findAllCategories();
    return categories;
};

const getCategoryById = async (id: number) => {
    const category = await categoryRepository.findCategoryById(id);
    return category;
}

const createCategory = async (name: string) => {
    const category = await categoryRepository.insertCategory(name);
    return category;
}

const updateCategory = async (id: number, name: string) => {
    const category = await categoryRepository.updateCategory(id, name);
    return category;
}

const deleteCategory = async (id: number) => {
    const category = await categoryRepository.deleteCategory(id);
    return category;
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };


