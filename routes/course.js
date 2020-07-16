const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { authToken, authorize } = require("../middlewares/authenticate")(db);
const pdf = require("../middlewares/html-pdf");
const stuDetails = require("../middlewares/user-details")(db);
const errorResponse = require("../handlers/error");
const {
  course: {
    getAllUserCourses,
    createCourse,
    completedCourseUpdate,
    generalUpdate,
    deleteCourse,
  },
} = require("../controllers/index");
const router = express.Router();
// const testController = require("../controllers/index");
// console.log(testController);
router.use(authToken);

router.route("/").get(getAllUserCourses).post(createCourse);

// admins only
// put
router
  .route("/completed/:userId/:courseId")
  .put(authorize("admin"), completedCourseUpdate);

router
  .route("/:userId/:courseId")
  .put(authorize("admin"), generalUpdate)
  .delete(authorize("admin"), deleteCourse);
module.exports = router;
