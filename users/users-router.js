const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkDepartment = require("../auth/check-department-middleware.js");

router.get("/", restricted, checkDepartment("student"), (req, res) => {
  Users.findBy({ departments: req.decodedJwt.departments })
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

// no req.body in get request
// const scopes = "student:read;student:write;student:delete;salary:read";

module.exports = router;
