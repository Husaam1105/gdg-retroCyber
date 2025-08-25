const pool = require('../config/database');

/**
 * Database setup script
 * Creates the users table and sets up initial database structure
 */
async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)
    `);

    console.log('✅ Database setup completed successfully!');
    console.log('📊 Tables created: users');
    
    process.exit(0);
  } catch (error) {
    console.error('💥 Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();