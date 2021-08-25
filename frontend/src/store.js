import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productReviewCreateReducer, productCategoryListReducer } from './reducers/ProductReducers';
import thunk from 'redux-thunk';
import { CartReducer } from './reducers/CartReducers';
import { userSigninReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userDeleteReducer, userUpdateReducer, userListReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from './reducers/orderReducers';

// const cartItems = localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : [];
// const shippingAddress = localStorage.getItem('shippingAddress')
//     ? JSON.parse(localStorage.getItem('shippingAddress'))
//     : {};
// const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null;
// const paymentMethod = 'PayPal';
const initialState = { 
    // cart: {
    //     shippingAddress : localStorage.getItem('shippingAddress') 
    //     ? JSON.parse(localStorage.getItem('shippingAddress'))
    //     : {},
    //     cartItems, paymentMethod: 'PayPal' }, 
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
        shippingAddress: localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          : {},
        paymentMethod: 'PayPal',
      },
    userSignin: { 
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null 
    } 
    };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: CartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderSummary: orderSummaryReducer,
    productReviewCreate: productReviewCreateReducer,
    productDelete: productDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productCategoryList: productCategoryListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;