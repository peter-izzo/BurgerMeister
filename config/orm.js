// Import MySQL connection.
const connection = require("./connection.js");

// This function puts question marks in SQL syntax query
const quesMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// convert object key/value pairs to SQL syntax
const toSQL = (obj) => {
  const arr = [];

  for (const i in obj) {
    let value = obj[i];
    if (Object.hasOwnProperty.call(obj, i)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `"${value}"`;
      }
      arr.push(`${i}=${value}`);
    }
  }

  // converts array of strings to a single comma-separated string
  return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
  all(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  create(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += quesMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, (err, res) => {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },

  update(table, objVals, condition, cb) {
    let queryString = `UPDATE ${table}`;

    queryString += " SET ";
    queryString += toSQL(objVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, res) => {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
  delete(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, res) => {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
};

// Export the orm object for burger.js
module.exports = orm;