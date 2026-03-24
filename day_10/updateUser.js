import { readFile, writeFile } from "./readAndWrite.js";
export const updateUser = async (email, updatedDetails, FILE) => {
    const users = await readFile(FILE);
    const userIndex = users.findIndex((user) => user.email === email);
    
    if (userIndex === -1) return { message: "User not found" };
    
    // Prevent overriding sensitive fields
    const { email: _email, password, id, ...rest } = updatedDetails;
    users[userIndex] = { ...users[userIndex], ...rest };
    
    await writeFile(FILE, users);
    return { message: "User updated successfully" };
}
