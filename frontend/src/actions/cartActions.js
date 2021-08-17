import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartContants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("http://localhost:3001/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, 
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                // seller:data.seller,
                product: data._id,
                qty
            }
        });
        // const { cart: { cartItems } } = getState();
        // localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {

    }
}
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}
const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod }