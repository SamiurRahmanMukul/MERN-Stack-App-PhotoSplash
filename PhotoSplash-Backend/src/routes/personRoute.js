// external modules imports
const express = require("express");

// internal modules imports
const avatarUpload = require("./../middleware/persons/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("./../middleware/persons/userValidators");
const { createPerson, getAllPersons, getPersonById, updatePerson, deletePerson } = require("./../controller/personController");

// express router object
const Router = express.Router();

// make a route to create a person
Router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, createPerson);

// make a route to get all persons
Router.get("/", getAllPersons);

// make a route to get a person by id
Router.get("/:id", getPersonById);

// make a route to update a person
Router.put("/:id", updatePerson);

// make a route to delete a person
Router.delete("/:id", deletePerson);

// export the router object
module.exports = Router;
