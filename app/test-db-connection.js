// test-db-connection.js
const { Pool } = require('pg');

// Suas credenciais e informações do banco de dados
const DB_USER = "postgres";
const DB_NAME = "postgres";
const DB_PORT = 5432;
const HOSTNAME = "postgres"; // Hostname que confirmamos ser o correto

// Senhas que vamos tentar, em ordem
const PASSWORDS_TO_TRY = [
  "RcKPDHfGc4EsRS42KO7dpJLbLB9fqz3n",
  "ybVGAy7K9HosGfikyX8K5wopzTkEK69h",
  "kUFEcOLxo1Da9ZgeQUzqg0jZxwUp21Q6"
];

async function testConnectionAttempt(password) {
  const databaseUrl = `postgresql://${DB_USER}:${password}@${HOSTNAME}:${DB_PORT}/${DB_NAME}`;
  console.log(`\nAttempting to connect to the database using hostname: ${HOSTNAME} and a password.`);
  console.log(`Connection URL: ${databaseUrl.replace(password, '********')}`); // Esconde a senha no log

  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 5000, // 5 segundos para tentar conectar
    idleTimeoutMillis: 30000,
    max: 1, // Apenas 1 cliente para este teste
  });

  try {
    const client = await pool.connect();
    console.log(`SUCCESS: Successfully connected to the database using hostname "${HOSTNAME}" with the provided password!`);
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Query executed successfully. Current time from DB:', result.rows[0].current_time);
    client.release();
    return true; // Conexão bem-sucedida
  } catch (error) {
    console.error(`FAILURE: Failed to connect with this password: ${error.message}`);
    // Apenas loga os detalhes do erro se não for uma falha de autenticação para evitar logs excessivos para senhas erradas
    if (error.code !== '28P01') { // 28P01 é o código para "password authentication failed"
      console.error('Error details:', error);
    }

    if (error.code === '28P01') {
      console.error('Hint: Password authentication failed. This password is not correct for user "postgres".');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Hint: Connection refused. Database might not be running or not listening on port 5432.');
    } else if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      console.error(`Hint: Host "${HOSTNAME}" not found. This indicates a network issue, not a password issue.`);
    } else if (error.code === '3D000') {
      console.error('Hint: Database does not exist. Check the database name in your connection string.');
    }
    return false; // Conexão falhou
  } finally {
    await pool.end(); // Fecha o pool de conexões após cada tentativa
  }
}

async function runAllConnectionTests() {
  for (const password of PASSWORDS_TO_TRY) {
    const success = await testConnectionAttempt(password);
    if (success) {
      console.log(`\nFinal result: Database connection successful with one of the provided passwords.`);
      return; // Sai se uma conexão for bem-sucedida
    }
  }
  console.error("\nFinal result: All provided passwords failed to connect to the database. Please verify the correct password for user 'postgres'.");
}

runAllConnectionTests();
