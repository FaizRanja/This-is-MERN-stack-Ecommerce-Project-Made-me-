import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home";
import Products from "./Component/DetailsofProducts/Products.js";
import "./App.css";
import ProductDetails from "./Component/DetailsofProducts/ProductDetails";
import Header from "./Component/Layout/Header/Header";
import Search from "./Component/DetailsofProducts/Search.js";
import LoginRegister from "./Component/User/LoginRegister";
import axios from "axios";
import UserOptions from "./Component/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import store from "../src/redux/store";
import { loadUser } from "./redux/actions/UserAction";
import Profile from "./Component/User/Profile";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPAssword from "./Component/User/ForgotPAssword";
import ResetPassword from "./Component/User/ResetPassword";
import Cart from "./Component/Cart/Cart";
import ShipingCart from "./Component/Cart/ShipingCart";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import Payment from "./Component/Cart/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./Component/Cart/OrderSuccess";
import Order from "./Component/Orders/Order";
import OrderDetails from "./Component/Orders/OrderDetails";
import Dashboard from "./Component/admin/Dashboard";
import ProtectedRoute from "./Component/ProtectRoute/ProtectRoute";
import AdminProducts from "./Component/admin/AdminProducts";
import NewAdminProduct from "./Component/admin/NewAdminProduct";
import UpdateProduct from "./Component/admin/UpdateProduct";
import OrderList from "./Component/admin/OrderList";
import ProcessOrder from "./Component/admin/ProcessOrder";
import UserList from "./Component/admin/UserList";
import UserUpdate from "./Component/admin/UserUpdate";
import ProductRewies from "./Component/admin/ProductRewies";
import Contact from "./Component/Contact.js/Contact";
import About from "./Component/About/About";
import Pagenotfound from "../src/Component/Note_found/Pagenotfound"

axios.defaults.withCredentials = true;

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey"
    );

    // Check if the fetched API key is not empty
    if (data.stripeApiKey && data.stripeApiKey.trim() !== "") {
      setstripeApiKey(data.stripeApiKey);
    } else {
      
    }
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "sans-serif"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
//   window.addEventListener("contextmenu" , (e)=>e.preventDefault())

  return (
    <BrowserRouter>
      <Header />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}></Elements>
        )}
        
          {isAuthenticated && <UserOptions user={user} />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/me/update" element={<UpdateProfile />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/password/update" element={<UpdatePassword />} />
      </Route>
            
          
            <Route path="/password/forgot" element={<ForgotPAssword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/Cart" element={<Cart />} />
            <Route element={<ProtectedRoute/>}>
            <Route path="/login/shipping" element={<ShipingCart />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/order/confirm" element={<ConfirmOrder />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/process/payment" element={<Payment />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/success" element={<OrderSuccess />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/orders" element={<Order />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/order/:id" element={<OrderDetails />} />
      </Route>
      
            <Route element={<ProtectedRoute isAdmin={true} />}>
        <Route path="admin/dashboard" element={<Dashboard />} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/products" element={<AdminProducts />} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product" element={<NewAdminProduct />} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/orders" element={<OrderList />} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/order/:id" element={<ProcessOrder/>} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/users" element={<UserList/>} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/user/:id" element={<UserUpdate/>} />
      </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/reviews/" element={<ProductRewies/>} />
      </Route>
      
        
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />

            <Route path="/process/payment" element={<Navigate to="/" />} />
      <Route path="*" element={<Pagenotfound />} />
          </Routes>
          <Footer />
     
    </BrowserRouter>
  );
};

export default App;
