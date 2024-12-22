import { findUserByEmail, findUserByEmailPassword, createUser } from "./userRepository";

const registerUser = async (name: string, email: string, password: string, role: string) => {
    return await createUser(name, email, password, role);
};

const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmailPassword(email, password);
    return user;
};

const getUserByEmail = async (email: string) => {
    const user = await findUserByEmail(email);
    return user;
};

export { registerUser, loginUser, getUserByEmail };
