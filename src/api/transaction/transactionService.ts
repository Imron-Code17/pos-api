import * as transactionRepository from "./transactionRepository";


const getAllTransactions = async () => {
    const transactions = await transactionRepository.findAllTransactions();
    return transactions;
}

const getTransactionById = async (id: number) => {
    const transaction = await transactionRepository.findTransactionById(id);
    return transaction;
}
const createTransaction = async (
    totalAmount: number,
    paymentType: string,
    userId: number
) => {
    const newTransaction = await transactionRepository.insertTransaction(
        totalAmount,
        paymentType,
        userId
    );
    return newTransaction;
};

const updateTransaction = async (id: number, transaction: any) => {
    const updatedTransaction = await transactionRepository.updateTransaction(id, transaction);
    return updatedTransaction;
};

const deleteTransaction = async (id: number) => {
    const transaction = await transactionRepository.deleteTransaction(id);
    return transaction;
};

export { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction };