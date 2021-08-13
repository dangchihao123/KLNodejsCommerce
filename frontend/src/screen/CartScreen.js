import React, { Component, useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function CartScreen(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    },[]);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Giỏ hàng
                    </h3>
                    <div>
                        Giá
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            giỏ hàng trống{" "} <Link to="/"><b>Tiếp tục mua sắm</b></Link>
                        </div>
                        :
                        cartItems.map(item =>
                            <li key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Số lượng:
                                    <select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    $ {item.price}
                                </div>
                            </li>
                        )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Tạm tính ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm)
                :
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary" disabled={cartItems.length === 0}>
                Tiến hành đặt hàng
               </button>
        </div>
    </div>
}

export default CartScreen;
