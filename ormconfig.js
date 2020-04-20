module.exports = {
   "type": "mysql",
   "host": process.env.DBHOST,
   "port": process.env.DBPORT,
   "username": process.env.DBUSERNAME,
   "password": process.env.DBPASSWORD,
   "database": process.env.DBNAME,
   "synchronize": process.env.DBSYNC,
   "logging": process.env.DBLOG,
   "cache": true,
   "charset": "UTF8MB4_GENERAL_CI",
   "entities": [
      // for dev i'll use src folder , in prod i'll user dist folder , it 'll be set as DB_Dir in package.json
      `${__dirname}/${process.env.DB_Dir}/models/*.{ts,js}`,

   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
