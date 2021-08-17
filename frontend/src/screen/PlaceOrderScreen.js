import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../component/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

const PlaceOrderScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>giao hàng</h2>
                                <p>
                                    <strong>Tên:</strong> {cart.shippingAddress.fullName}<br />
                                    <strong>Địa chỉ:</strong>{" "}{cart.shippingAddress.address}<br />
                                    <strong>Số điện thoại:</strong>{" "}{cart.shippingAddress.phoneNumber}<br />
                                    <strong>Tỉnh/Thành phố:</strong>{cart.shippingAddress.city}<br />
                                    <strong>Mã bưu điện:</strong>{cart.shippingAddress.postalCode}<br />
                                    <strong>Quốc gia:</strong>{cart.shippingAddress.country}<br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>thanh toán</h2>
                                <p>
                                    <strong>phương thức:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Mặt hàng</h2>
                                <ul className="cart-list-container">
                                    {
                                        cart.cartItems.map(item =>
                                            <li>
                                                <div className="cart-image">
                                                    <img src={item.image} alt="product" />
                                                </div>
                                                <div className="cart-name">
                                                    <div>
                                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                                    </div>
                                                </div>
                                                <div className="cart-price">
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Đơn hàng</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>giá sản phẩm</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tiền ship</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Thuế</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Tổng tiền cần trả</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="button primary block" disabled={cart.cartItems.length === 0}>
                                    Đặt hàng
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;
