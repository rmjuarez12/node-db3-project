//* Import the db configuration
const db = require("../../data/db-config");

//* Function to get all schemes
function find() {
  return db("schemes");
}

//* Function to find a scheme by ID
function findById(id) {
  return db("schemes")
    .where({ id })
    .then((schemaObject) => {
      if (!schemaObject.length) {
        return Promise.resolve(null);
      }

      return schemaObject;
    });
}

//* Functions to find the steps of a specific scheme
function findSteps(id) {
  return db("steps")
    .where({ scheme_id: id })
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.*");
}

//* Function to create a new scheme
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((id) => {
      return findById(id);
    });
}

//* Function to update ane existing scheme
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

//* Function to remove a specific scheme
function remove(id) {
  return db("schemes").where({ id }).del();
}

//* Export modules
module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
