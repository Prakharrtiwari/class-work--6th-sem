import http from "http";
import { userLogin } from "./login.js";
import { register } from "./register.js";
import { deleteUser } from "./deleteUser.js";
import { changePassword } from "./changePassword.js";
import { getAllUsers } from "./getAllUsers.js";
import { getUser } from "./getUser.js";
import { updateUser } from "./updateUser.js";

const PORT = 8800;
const FILE = "./users.json";

const server = http.createServer((req, res) => {
    // Helper to send JSON response
    const sendResponse = (statusCode, data) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    };

    // Helper to parse body
    const getBody = () => new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => body += chunk.toString());
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
    });

    if (req.url === "/login" && req.method === "POST") {
        getBody().then(async (body) => {
            const response = await userLogin(body, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    } 
    else if (req.url === "/register" && req.method === "POST") {
        getBody().then(async (body) => {
            const response = await register(body, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    }
    else if (req.url === "/delete" && req.method === "DELETE") {
        getBody().then(async (body) => {
            if (!body.email) return sendResponse(400, { message: "Email is required" });
            const response = await deleteUser(body.email, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    }
    else if (req.url === "/change-password" && req.method === "PUT") {
        getBody().then(async (body) => {
            if (!body.email || !body.oldPassword || !body.newPassword) {
                return sendResponse(400, { message: "email, oldPassword, and newPassword are required" });
            }
            const response = await changePassword(body, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    }
    else if (req.url === "/users" && req.method === "GET") {
        getAllUsers(FILE).then(response => {
            sendResponse(200, response);
        }).catch(() => sendResponse(500, { message: "Server Error" }));
    }
    else if (req.url === "/user" && req.method === "POST") {
        getBody().then(async (body) => {
            if (!body.email) return sendResponse(400, { message: "Email is required" });
            const response = await getUser(body.email, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    }
    else if (req.url === "/update" && req.method === "PUT") {
        getBody().then(async (body) => {
            if (!body.email) return sendResponse(400, { message: "Email is required to update" });
            const response = await updateUser(body.email, body, FILE);
            sendResponse(200, response);
        }).catch(() => sendResponse(400, { message: "Invalid JSON" }));
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Endpoint not found or method not allowed");
    }
});

server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));