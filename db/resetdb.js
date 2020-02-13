// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const Pool = require('pg-native');

// PG connection setup

const pool = new Pool();

// Loads the schema files from db/schema
const runSchemaFiles = function() {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    pool.querySync(sql);
  }
};


try {
  console.log(`-> Connecting to PG`);
  pool.connectSync();
  runSchemaFiles();
  pool.end();
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  pool.end();
}