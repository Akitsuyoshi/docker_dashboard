require('dotenv').config(); // instatiate environment variables

const CONFIG = {}; // Make this global to use all over the application

CONFIG.env = process.env.NODE_ENV || 'development';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27018';
CONFIG.db_name = process.env.DB_NAME || 'sampledb';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'db-password';

export default CONFIG;
