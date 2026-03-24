import { readFile } from "./readAndWrite.js";
export const getAllUsers = async (FILE) => {
    const users = await readFile(FILE);
    // Return users without exposing passwords
    const usersWithoutPasswords = users.map(user => {
        const { password, ...rest } = user;
        return rest;
    });
    return usersWithoutPasswords;
}
