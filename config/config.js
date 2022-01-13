require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_DATABASE || "you-s-edBooks",
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
