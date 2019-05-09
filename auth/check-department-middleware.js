const Users = require("../users/users-model.js");

module.exports = department => {
  return function(req, res, next) {
    console.log("Hi");
    if (
      req.decodedJwt.departments &&
      req.decodedJwt.departments.includes("teacher")
    ) {
      console.log("Hello");
      Users.find()
        .then(users => {
          console.log(users);
          res.json(users);
        })
        .catch(err => res.send(err));
    } else if (
      req.decodedJwt.departments &&
      req.decodedJwt.departments.includes("student")
    ) {
      console.log("Student");
      next();
    }
    // {
    //   res.status(403).json({ you: "you have no power here!" });
    // }
  };
};
