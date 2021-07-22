module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "logging": false,
   "entities": [
      //"src/modules/events/database/entities/*.ts"
      "dist/**/*.entity.js"
   ],
   "migrations": [
      //"src/config/database/migrations/*.ts"
      "dist/config/database/migrations/**/*.js"
   ],
   "cli": {
      "migrationsDir": "src/config/database/migrations"
   }
   //"ssl": true,
   //"extra": { "ssl": { "rejectUnauthorized": false } }
}