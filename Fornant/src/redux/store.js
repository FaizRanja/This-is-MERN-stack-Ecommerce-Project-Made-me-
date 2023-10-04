import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { DeleteReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/ProductReducers";
import { UserReducer, allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer } from "./reducers/UserReducer";
import { CartReducer } from "./reducers/CartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/OrderRedcer";





const reducer = combineReducers({
products:productsReducer,
productDetails:productDetailsReducer,
user:UserReducer,
profile:profileReducer,
forgetPassword:forgotPasswordReducer,
cart:CartReducer,
neworder:newOrderReducer,
myorder:myOrdersReducer,
OrderDetails:orderDetailsReducer,
newreviwes:newReviewReducer,
newProduct:newProductReducer,
DeleteProducts:DeleteReducer,
Allorder:allOrdersReducer,
order:orderReducer,
allUser:allUsersReducer,
userDetails:userDetailsReducer,
productReviews:productReviewsReducer,
review:reviewReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;