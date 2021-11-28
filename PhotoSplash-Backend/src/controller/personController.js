// external modules imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal modules imports
const Person = require("./../models/personModel");

// make a controller to create a person
async function createPerson(req, res, next) {
  let newPerson;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newPerson = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newPerson = new Person({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    await newPerson.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}

// make a controller to get all persons
async function getAllPersons(req, res) {
  try {
    const persons = await Person.find();
    res.status(200).json({ persons });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not get all persons!",
        },
      },
    });
  }
}

// make a controller to get a person by id
async function getPersonById(req, res) {
  try {
    const person = await Person.findById(req.params.id);
    res.status(200).json({ person });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not get person by id!",
        },
      },
    });
  }
}

// make a controller to update a person
async function updatePerson(req, res) {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ person });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not update person!",
        },
      },
    });
  }
}

// make a controller to delete a person
async function deletePerson(req, res, next) {
  try {
    const person = await person.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove person avatar if any
    if (person.avatar) {
      unlink(path.join(__dirname, `./../../public/uploads/avatars/${person.avatar}`), (err) => {
        if (err) console.log(err);
      });
    }

    res.status(200).json({
      message: "person was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the person!",
        },
      },
    });
  }
}

// export all the controllers
module.exports = {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
};
