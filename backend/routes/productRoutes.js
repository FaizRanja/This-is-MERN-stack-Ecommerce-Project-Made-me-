const express = require("express");
const {
  getallproduct,
  createProdut,
  updateproduct,
  deleteproduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  DeleteReviwes,
  getaAdminproduct,
} = require("../Controllar/Productcontrollar");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const { route } = require("./UserRoutes");

const router = express.Router();

router.route("/products").get(  getallproduct);

router.route("/admin/products").get( isAuthenticated,authorizeRoles("admin"),  getaAdminproduct);


router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProdut);

router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateproduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteproduct);

router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/review")
  .get(getProductReviews)
  .delete(isAuthenticated, DeleteReviwes);

module.exports = router;
