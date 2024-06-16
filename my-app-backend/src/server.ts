import express from 'express';    // Import express to create the server
import cors from 'cors';          // Import CORS to handle cross-origin requests
import bodyParser from 'body-parser';  // Import body-parser to parse request bodies
import { Pool } from 'pg';        // Import Pool from pg to connect to PostgreSQL

const app = express();            // Initialize the express application
const port = 5432 || 5000;  // Use the port specified by Heroku or 5000 for local

app.use(cors());                  // Enable CORS for all routes
app.use(bodyParser.json());       // Enable parsing of JSON bodies

// Set up the PostgreSQL connection pool
const pool = new Pool({
  connectionString: 'postgres://ucvfvp7g5tl3jq:pa6add376e509bb38867a0381cce3a8728329516cdcf2f394c223804a2edac741@c2v3jin4rntblb.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5k37u9lhmatau',  // Use the DATABASE_URL environment variable
  ssl: {
    rejectUnauthorized: false  // Allow self-signed certificates
  }
});

// Endpoint to add a new name to the database
app.post('/names', async (req, res) => {
  const { firstName, lastName } = req.body;  // Destructure the firstName and lastName from the request body
  try {
    const result = await pool.query(
      'INSERT INTO names (first_name, last_name) VALUES ($1, $2) RETURNING *',
      [firstName, lastName]
    );
    res.json(result.rows[0]);  // Respond with the newly inserted row
  } catch (err) {
    console.error(err);  // Log any errors to the console
    res.status(500).json({ error: 'Database error' });  // Respond with a 500 status code and error message
  }
});

// Endpoint to retrieve all names from the database
app.get('/names', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM names');  // Query all rows from the names table
    res.json(result.rows);  // Respond with the result rows
  } catch (err) {
    console.error(err);  // Log any errors to the console
    res.status(500).json({ error: 'Database error' });  // Respond with a 500 status code and error message
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
