import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

const findUserByEmailPassword = async (email: string, password: string) => {
    return await prisma.user.findUnique({
        where: { email, password },
    });
}

const createUser = async (name: string, email: string, password: string, role: string) => {
    return await prisma.user.create({
        data: {
            name,
            email,
            password,
            role,
        },
    });
};

export { findUserByEmail, findUserByEmailPassword,createUser };
