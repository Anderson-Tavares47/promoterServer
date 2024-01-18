const pgp = require('pg-promise')();

const db = pgp('postgres://hgcilqgu:ISwYFpenA03Tc-vCEGTFA9y-KSd6oDcS@babar.db.elephantsql.com/hgcilqgu');

module.exports = db;