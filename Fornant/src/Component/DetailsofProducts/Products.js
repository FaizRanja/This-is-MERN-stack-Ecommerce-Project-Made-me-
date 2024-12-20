import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClearError, getProduct } from "../../redux/actions/productAction";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@material-ui/core"; // Import Slider from @material-ui/core
import MetaData from "../Layout/Header/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productsCount, resultPerPage ,} = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage,price,category,ratings)); // Pass currentPage value explicitly
  }, [dispatch, keyword, currentPage,price,category,ratings]);

  useEffect(() => {
    if (error) {
      // Handle the error in your preferred way (e.g., show a notification)
      console.error(error);
      dispatch(ClearError());
    }
  }, [error, dispatch]);


 

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Book Hessal Free housekepping service in fasialbad -UrbanCity"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          <div className="paginationBox">
          {resultPerPage < productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            
          )}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;





