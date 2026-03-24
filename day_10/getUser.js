import { readFile } from "./readAndWrite.js";
export const getUser = async (email, FILE) => {
    const users = await readFile(FILE);
    const user = users.find((user) => user.email === email);
    if (!user) return { message: "User not found" };
    
    const { password, ...userDetails } = user;
    return userDetails;
}
