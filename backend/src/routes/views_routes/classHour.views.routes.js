module.exports = app => {
  const classHours = require("../../controllers/views_controllers/classHour.views.controller");
  // const authSession = require("../../controllers/auth.session.js");

  var router = require("express").Router();

  // Save a new Class Hours
  router.post("/", classHours.store);

  // Retrieve all Class Hours
  router.get("/", authSession.isAuthenticated, classHours.index);

  // Show Form to create a new Class Hours
  router.get("/create", classHours.create);

  // Show Class Hours with id
  // router.get("/:id", authSession.isAuthenticated, classHours.show);

  // Show form to edit Class Hours with id
  router.get("/edit/:id", classHours.edit);

  // Update a Class Hours with id
  router.post("/update/:id", classHours.update);

  // Delete a Class Hours with id
  router.post("/delete/:id", classHours.destroy);

  app.use('/classHours', router);

};