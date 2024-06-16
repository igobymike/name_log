const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://ucvfvp7g5tl3jq:pa6add376e509bb38867a0381cce3a8728329516cdcf2f394c223804a2edac741@c2v3jin4rntblb.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5k37u9lhmatau',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connection successful:', res.rows);
  }
  pool.end();
});
