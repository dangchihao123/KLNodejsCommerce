import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../component/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

function format1(n, currency) {
    return  n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency ;
  }

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
                                    <strong>Tên:</strong>&nbsp; {cart.shippingAddress.fullName}<br />
                                    <strong>Địa chỉ:</strong>&nbsp;{cart.shippingAddress.address}<br />
                                    <strong>Số điện thoại:</strong>&nbsp;{cart.shippingAddress.phoneNumber}<br />
                                    <strong>Tỉnh/Thành phố:</strong>&nbsp;{cart.shippingAddress.city}<br />
                                    <strong>Mã bưu điện:</strong>&nbsp;{cart.shippingAddress.postalCode}<br />
                                    <strong>Quốc gia:</strong>&nbsp;{cart.shippingAddress.country}<br />
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
                                                    {item.qty} x {format1(item.price,'VNĐ')} = {format1(item.qty * item.price, 'VNĐ')}
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
                                    <div>giá sản phẩm:</div>&nbsp;
                                    <div> {format1(cart.itemsPrice,'VNĐ')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tiền ship:</div>&nbsp;
                                    <div>{format1(cart.shippingPrice,'VNĐ')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Thuế:</div>&nbsp;
                                    <div>{format1(cart.taxPrice,'VNĐ')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Tổng tiền cần trả:</strong></div>&nbsp;
                                    <div><strong>{format1(cart.totalPrice,'VNĐ')}</strong></div>
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
