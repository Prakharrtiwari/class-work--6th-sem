import { readFile, writeFile } from "./readAndWrite.js";
export const deleteUser = async (email, FILE) => {
    const users = await readFile(FILE);
    const filteredUsers = users.filter((user) => user.email !== email);
    
    if (users.length === filteredUsers.length) {
        return { message: "User not found" };
    }
    
    await writeFile(FILE, filteredUsers);
    return { message: "User deleted successfully" };
}
