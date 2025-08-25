const { Pool } = require('pg');
require('dotenv').config();

/**
 * PostgreSQL database connection configuration
 * Handles connection pooling for optimal performance
 */
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'retro_cyber_db',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('🗄️  Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('💥 Database connection error:', err);
  process.exit(-1);
});

module.exports = pool;