const { start } = require("repl");
const db = require("../../models");
const ClassHour = db.classHour;
const Op = db.Sequelize.Op;

//Save a new classHour
exports.store = (req, res) => {
  // Validate request
  if (!req.body.turn || !req.body.sessionHour || !req.body.start || !req.body.end) {
    return res.render("error", {
      message: "Content can not be empty!"
    });
  }

  //Create a ClassHour
  const classHour = {
    turn: req.body.turn,
    sessionHour: req.body.sessionHour,
    start: req.body.start,
    end: req.body.end
  };

  //Save ClassHour in the Database
  ClassHour.create(classHour)
    .then(data => {
      findAll(req, res);
    })
    .catch(err => {
      return res.render("error", {
        message: err.message || "Some error occurred while creating the Class Hour."
      });
    });
};

// Retrieve all ClassHours
exports.index = (req, res) => {
  findAll(req, res);
};

const findAll = (req, res) => {
  ClassHour.findAll()
    .then(data => {
      return res.render('classHour/index', { classHours: data });
    })
    .catch(err => {
      return res.render("error", {
        message: err.message || "Some error occurred while retrieving class hours."
      });
    });
}

//Show Form to create a new Class Hour
exports.create = (req, res) => {
  return res.render("classHour/create");
};

// Show form to edit Class Hours with id
exports.edit = (req, res) => {
  const id = req.params.id;

  ClassHour.findByPk(id)
    .then(data => {
      return res.render("classHour/edit", { classHour: data });
    })
    .catch(err => {
      return res.render("error", {
        message: "Error retrieving classHour with id=" + id
      });
    });
}

// Update a ClassHour with id
exports.update = (req, res) => {
  const id = req.params.id;

  ClassHour.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        findAll(req, res);
      } else {
        return res.render("error", {
          message: `Cannot update Class Hour with id=${id}. Maybe Class Hour was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      return res.render("error", {
        message: "Error updating Class Hour with id=" + id
      });
    });
}


// Delete a Class Hour with id
exports.destroy = (req, res) => {
  const id = req.params.id;

  ClassHour.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        findAll(req, res);
      } else {
        return res.render("error", {
          message: `Cannot delete Class Hour with id=${id}. Maybe Class Hour was not found!`
        });
      }
    })
    .catch(err => {
      return res.render("error", {
        message: "Could not delete Class Hour with id=" + id
      });
    });
};
