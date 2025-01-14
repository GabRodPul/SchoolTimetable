// import { Op } from "sequelize";

const db = require("../../models");
const group = db.group;
const Op = db.Sequelize.Op;

//Save a new group
exports.store = (req, res) => {
    //validate request 
    if (!req.body.name){
        return res.render("error", {
            message: "Content can not be empty"
        });
    }

    //Create a group
    const group = {
        name: req.body.name
    }

    //save a group in the Database
    group.create(group)
    .then(
        data => {
            findAll(req, res);
        }
    )
    .catch(err.render("error", {
        message: err.message || "Some error ocurred while creating the group"
    }))

    //Retrive all groups
    exports.index = (req, res) => {
        findAll(req, res);
    };

    const findAll = (req, res).then(data => {
        return res.render("group/index",{groups: data});
    })
    .catch(err => {
        return res.render("error", {
            message: err.message || "Some error ocurred while retrive groups"
        });  
    });
}

//Show Form  to create a new group
exports.create = (req, res) => {
    return res.render("classHour/create");
};

//Show Form to edit a group
exports.edit = (req, res) => {
    const id = req.params.id;

    group.findByPk(id)
    .then(data => {
        return res.render("group/edit", { group: data })
    })
    .catch(err => {
        return res.render("error", {
            message: err.message || "Some error ocurred while retrive groups"
        });  
    });
}

//Update a group by id
exports.update = (req, res) => {
    const id = req.params.id;

    group.update(req.body,{
        where: {id: id}
    })
    .then( num => {
        if ( num == 1){
            findAll(req, res);
        }else {
            return res.render("error", {
                message: `Cannot update group with id=${id}. Maybe group was not found or req.body is empty`
            })
        }
    })
    .catch(err => {
        return res.render("error", {
            message: err.message || "Some error ocurred while updating groups"
        });  
    });
}

//Delete a group by id

exports.destroy = (req, res) => {
    const id = req.params.id;

    group.destroy(req.body,{
        where: {id: id}
    })
    .then( num => {
        if ( num == 1){
            findAll(req, res);
        }else {
            return res.render("error", {
                message: `Cannot delet group with id=${id}. Maybe group was not found or req.body is empty`
            })
        }
    })
    .catch(err => {
        return res.render("error", {
            message: err.message || "Some error ocurred while deleting the group"
        });  
    });
}
