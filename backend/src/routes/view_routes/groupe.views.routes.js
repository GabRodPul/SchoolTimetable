module.exports = app => {

    const group = require("../../controllers/views_controllers/group.views.controller");

    var router = require("express").Router();

    // Save a new Group
    router.post("/", groups.store);

    // Retrieve all Group
    router.get("/", groups.index);

    // Show Form to create a new Group
    router.get("/create", groups.create);

    // Show Group with id
    // router.get("/:id", authSession.isAuthenticated, groups.show);

    // Show form to edit Group with id
    router.get("/edit/:id", groups.edit);

    // Update a Group with id
    router.post("/update/:id", groups.update);

    // Delete a Group with id
    router.post("/delete/:id", groups.destroy);

    app.use('/groups', router);
}