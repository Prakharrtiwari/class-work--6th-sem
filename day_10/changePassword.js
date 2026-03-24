import { readFile, writeFile } from "./readAndWrite.js";
export const changePassword = async ({ email, oldPassword, newPassword }, FILE) => {
    const users = await readFile(FILE);
    const userIndex = users.findIndex((user) => user.email === email);
    
    if (userIndex === -1) return { message: "User not found" };
    if (users[userIndex].password !== oldPassword) return { message: "Incorrect old password" };
    
    users[userIndex].password = newPassword;
    await writeFile(FILE, users);
    return { message: "Password changed successfully" };
}
