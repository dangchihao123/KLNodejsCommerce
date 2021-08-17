import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import { PayPalButton } from 'react-paypal-button-v2';

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const OrderScreen = (props) => {
    const orderId = props.match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { error: errorDeliver, success: successDeliver, loading: loadingDeliver } = orderDeliver;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('http://localhost:3001/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (
            !order || successPay || successDeliver || (order && order._id !== orderId)
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, sdkReady, order, successPay, successDeliver]);
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    }
    // const createOrder = (data, actions) => {
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 amount: {
    //                     value: "1000",
    //                 },
    //             },
    //         ],
    //     });
    // }

    // const onApprove = (data, actions) => {
    //     return actions.order.capture();
    // }
    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant='danger'>{error}</MessageBox>)
            : (
                <div>
                    <h1>Order: {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>giao hàng</h2>
                                        <p>
                                            <strong>Tên:</strong> {order.shippingAddress.fullName}<br/>
                                            <strong>Địa chỉ:</strong> {order.shippingAddress.address},<br/>                                 
                                            <strong>Số điện thoại:</strong> {order.shippingAddress.phoneNumber},<br/> 
                                            <strong>Tỉnh/Thành Phố:</strong> {order.shippingAddress.city},<br/> 
                                            <strong>Mã bưu điện:</strong> {order.shippingAddress.postalCode},<br/> 
                                            <strong>Quốc gia:</strong> {order.shippingAddress.country}<br/> 
                                           
                                        </p>
                                        {order.isDelivered ? (
                                            <MessageBox variant='success'>
                                                Đã xác nhận giao hàng  {order.deliveredAt}
                                            </MessageBox>)
                                            : (<MessageBox variant='danger'>Chưa xác nhận giao hàng</MessageBox>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Thanh toán</h2>
                                        <p>
                                            <strong>Phương thức:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <MessageBox variant='success'>
                                                Đã thanh toán {order.paidAt}
                                            </MessageBox>)
                                            : (<MessageBox variant='danger'>Chưa thanh toán</MessageBox>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Mặt hàng</h2>
                                        <ul className="cart-list-container">
                                            {
                                                order.orderItems.map(item =>
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
                                            <div>${order.itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tiền ship</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Thuế</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Tổng tiền cần trả</strong></div>
                                            <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>
                                    {!order.isPaid && order.paymentMethod === "Payment" && (
                                        <li>
                                            {!sdkReady ? (
                                                <LoadingBox></LoadingBox>
                                            ) : (
                                                <>
                                                    {errorPay && (<MessageBox>{errorPay}</MessageBox>)}
                                                    {loadingPay && <LoadingBox></LoadingBox>}
                                                    {/* <PayPalButton
                                                        amount={order.totalPrice}>
                                                        onSuccess={successPaymentHandler}
                                                    </PayPalButton> */}
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    // createOrder={(data, actions) => createOrder(data, actions)}
                                                    // onApprove={(data, actions) => onApprove(data, actions)}
                                                    />
                                                </>
                                            )
                                            }
                                        </li>
                                    )}
                                    
                                    {userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                            <button
                                                type="button"
                                                onClick={deliverHandler}
                                                className="button primary block"
                                            >
                                                Xác nhận đơn hàng
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
}

export default OrderScreen;
