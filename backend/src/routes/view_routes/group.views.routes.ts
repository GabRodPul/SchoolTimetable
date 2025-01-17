module.exports = app => {

    const group = require("../../controllers/views_controllers/group.views.controller");

    var router = require("express").Router();

    // Save a new Group
    router.post("/", group.store);

    // Retrieve all Group
    router.get("/", group.index);

    // Show Form to create a new Group
    router.get("/create", group.create);

    // Show Group with id
    // router.get("/:id", authSession.isAuthenticated, group.show);

    // Show form to edit Group with id
    router.get("/edit/:id", group.edit);

    // Update a Group with id
    router.post("/update/:id", group.update);

    // Delete a Group with id
    router.post("/delete/:id", group.destroy);

    app.use('/groups', router);
}