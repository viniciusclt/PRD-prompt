// test-db-connection.js
const { Pool } = require('pg');

// Suas credenciais e informações do banco de dados
const DB_USER = "postgres";
const DB_PASSWORD = "RcKPDHfGc4EsRS42KO7dpJLbLB9fqz3n"; // Sua senha real
const DB_NAME = "postgres"; // O nome do banco de dados agora é 'postgres'
const DB_PORT = 5432;

// Hostnames que vamos tentar, em ordem de preferência
const HOSTNAMES_TO_TRY = ["supabase-db", "postgres"];

async function testConnectionAttempt(hostname) {
  const databaseUrl = `postgresql://${DB_USER}:${DB_PASSWORD}@${hostname}:${DB_PORT}/${DB_NAME}`;
  console.log(`\nAttempting to connect to the database using hostname: ${hostname}`);
  console.log(`Connection URL: ${databaseUrl.replace(DB_PASSWORD, '********')}`); // Esconde a senha no log

  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 5000, // 5 segundos para tentar conectar
    idleTimeoutMillis: 30000,
    max: 1, // Apenas 1 cliente para este teste
  });

  try {
    const client = await pool.connect();
    console.log(`SUCCESS: Successfully connected to the database using hostname: ${hostname}!`);
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Query executed successfully. Current time from DB:', result.rows[0].current_time);
    client.release();
    return true; // Conexão bem-sucedida
  } catch (error) {
    console.error(`FAILURE: Failed to connect using hostname ${hostname}: ${error.message}`);
    console.error('Error details:', error);
    if (error.code === 'ENOTFOUND') {
      console.error(`Hint: Host "${hostname}" not found. This hostname might be incorrect or unreachable.`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Hint: Connection refused. Database might not be running or not listening on port 5432.');
    } else if (error.code === '28P01') {
      console.error('Hint: Password authentication failed. Check your username and password.');
    } else if (error.code === '3D000') {
      console.error('Hint: Database does not exist. Check the database name in your connection string.');
    }
    return false; // Conexão falhou
  } finally {
    await pool.end(); // Fecha o pool de conexões após cada tentativa
  }
}

async function runAllConnectionTests() {
  for (const hostname of HOSTNAMES_TO_TRY) {
    const success = await testConnectionAttempt(hostname);
    if (success) {
      console.log(`\nFinal result: Database connection successful with hostname "${hostname}".`);
      return; // Sai se uma conexão for bem-sucedida
    }
    // Se falhou com ENOTFOUND, tenta o próximo hostname.
    // Se falhou por outro motivo (senha, recusado), não tenta o próximo, pois o problema é mais profundo.
    if (hostname === HOSTNAMES_TO_TRY[0] && success === false && error && error.code !== 'ENOTFOUND') {
        console.log("Connection failed for a reason other than 'hostname not found'. Stopping further attempts.");
        return;
    }
  }
  console.error("\nFinal result: All connection attempts failed. Please review the hostnames, credentials, and database status.");
}

runAllConnectionTests();
