// test-db-connection.js
const { Pool } = require('pg');

// Sua DATABASE_URL completa
// **LEMBRE-SE DE SUBSTITUIR A SENHA E O NOME DO BANCO DE DADOS SE NECESSÁRIO**
const databaseUrl = "postgresql://postgres:RcKPDHfGc4EsRS42KO7dpJLbLB9fqz3n@supabase-db:5432/postgres-prd";

async function testDbConnection() {
  const pool = new Pool({
    connectionString: databaseUrl,
    // Opcional: Adicione um timeout para a conexão, se ela demorar muito
    connectionTimeoutMillis: 5000, // 5 segundos
    idleTimeoutMillis: 30000, // 30 segundos
    max: 20, // Número máximo de clientes no pool
  });

  try {
    console.log('Attempting to connect to the database...');
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Query executed successfully. Current time from DB:', result.rows[0].current_time);
    client.release(); // Libera o cliente de volta para o pool
    console.log('Database connection test successful!');
  } catch (error) {
    console.error('Failed to connect to the database or execute query:', error.message);
    console.error('Error details:', error);
    if (error.code === 'ENOTFOUND') {
      console.error('Error: Host "supabase-db" not found. Check if the database service is running and accessible by name.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Error: Connection refused. Check if the database is running and listening on port 5432, and if firewalls are allowing the connection.');
    } else if (error.code === '28P01') { // PostgreSQL error code for password authentication failed
      console.error('Error: Password authentication failed. Check your username and password.');
    } else if (error.code === '3D000') { // PostgreSQL error code for invalid catalog name (database does not exist)
      console.error('Error: Database does not exist. Check the database name in your connection string.');
    }
  } finally {
    await pool.end(); // Fecha o pool de conexões
  }
}

testDbConnection();
