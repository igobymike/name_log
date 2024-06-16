"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express to create the server
const cors_1 = __importDefault(require("cors")); // Import CORS to handle cross-origin requests
const body_parser_1 = __importDefault(require("body-parser")); // Import body-parser to parse request bodies
const pg_1 = require("pg"); // Import Pool from pg to connect to PostgreSQL
const app = (0, express_1.default)(); // Initialize the express application
const port = process.env.PORT  || 5000; // Use the port specified by Heroku or 5000 for local
app.use((0, cors_1.default)()); // Enable CORS for all routes
app.use(body_parser_1.default.json()); // Enable parsing of JSON bodies
// Set up the PostgreSQL connection pool
const pool = new pg_1.Pool({
    connectionString: 'postgres://ucvfvp7g5tl3jq:pa6add376e509bb38867a0381cce3a8728329516cdcf2f394c223804a2edac741@c2v3jin4rntblb.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5k37u9lhmatau', // Use the DATABASE_URL environment variable
    ssl: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});
// Endpoint to add a new name to the database
app.post('/names', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body; // Destructure the firstName and lastName from the request body
    try {
        const result = yield pool.query('INSERT INTO names (first_name, last_name) VALUES ($1, $2) RETURNING *', [firstName, lastName]);
        res.json(result.rows[0]); // Respond with the newly inserted row
    }
    catch (err) {
        console.error(err); // Log any errors to the console
        res.status(500).json({ error: 'Database error' }); // Respond with a 500 status code and error message
    }
}));
// Endpoint to retrieve all names from the database
app.get('/names', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM names'); // Query all rows from the names table
        res.json(result.rows); // Respond with the result rows
    }
    catch (err) {
        console.error(err); // Log any errors to the console
        res.status(500).json({ error: 'Database error' }); // Respond with a 500 status code and error message
    }
}));
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
