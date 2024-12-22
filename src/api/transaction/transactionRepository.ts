import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllTransactions = async () => {
    const transactions = await prisma.transaction.findMany();
    return transactions;
};

const findTransactionById = async (id: number) => {
    const transaction = await prisma.transaction.findUnique({
        where: { id },
    });
    return transaction;
};

const insertTransaction = async (
    totalAmount: number,
    paymentType: string,
    userId: number
) => {
    const newTransaction = await prisma.transaction.create({
        data: {
            totalAmount,
            paymentType,
            userId
        },
    });
    return newTransaction;
};

const updateTransaction = async (id: number, transaction: any) => {
    const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: transaction,
    });
    return updatedTransaction;
};

const deleteTransaction = async (id: number) => {
    const transaction = await prisma.transaction.delete({
        where: { id },
    });
    return transaction;
};

export { findAllTransactions, findTransactionById, insertTransaction, updateTransaction, deleteTransaction };