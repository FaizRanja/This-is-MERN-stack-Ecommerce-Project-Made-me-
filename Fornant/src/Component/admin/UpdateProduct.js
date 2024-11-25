import React, { Fragment, useEffect, useState } from "react";
import "./NewAdminProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { ClearError, updateProduct,getProductDetails } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Layout/Header/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../redux/constant/ProductConstant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const { id } = useParams()

    const {loading, error:updatError, isUpdated}=useSelector ((state)=>state.DeleteProducts)

const {error ,product}=useSelector((state)=>state.productDetails)

    const [name,setName] =useState("")
    const [price,setPrice] =useState("")
    const [description,setDescription] =useState("")
    const [category,setCategory] =useState("")
    const [Stock,setStock] =useState("")
    const [images,setImages] =useState([])
    const [oldimages,setOldImages] =useState([])
    const [imagesPreview,setImagesPreview] =useState([])

    const categories=[
        "laptop",
        "mobile",
        "camera",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "smartPhone",
      ]

      const productsId=(id)
useEffect(()=>{

if(product && product._id !== productsId){
    dispatch(getProductDetails(productsId))
}else{
    setName(product.name)
    setDescription(product.description)
    setCategory(product.Category)
    setStock(product.Stock)
    setOldImages(product.images)
    setPrice(product.price)
}

    if(error){
        alert.error(error)
        dispatch (ClearError())
    }
    if(updatError){
        alert.error(updatError)
        dispatch (ClearError())
    }
    if(isUpdated){
        alert.success("Product Updated Successfully")
        navigate("/admin/products")
        dispatch ({type:UPDATE_PRODUCT_RESET})

    }
    
},[dispatch,alert,navigate,error,isUpdated ,productsId,product ,updatError ])      

const UpdateProductSubmitHandler=(e)=>{
e.preventDefault()
const myForm = new FormData();

myForm.set("name",name)
myForm.set("description",description)
myForm.set("category",category)
myForm.set("price",price)
myForm.set("Stock",Stock)


images.forEach((image)=>{
    myForm.append("images",image)
})
dispatch (updateProduct( productsId, myForm))
}

const UpdateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
setOldImages([])
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
 


  return (
    <Fragment>
      <MetaData title={"Create-Product"} />

      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={UpdateProductSubmitHandler}
          >
<h1>Create Product</h1>

<div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price }
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category } onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={Stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={UpdateProductImagesChange }
                multiple
              /> 
            </div>

            <div id="createProductFormImage">
              {oldimages && oldimages.map((image, index) => (
                <img key={index} src={image.url} alt=" old Product Preview" />
              ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>


          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;

