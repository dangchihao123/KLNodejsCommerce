import React, { useState } from 'react';
import CheckoutSteps from '../component/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentMethodScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div className="">
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <div>
                            <h1>Phương thức thanh toán</h1>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="paypal"
                                    value="Paypal"
                                    name="paymentMethod"
                                    required
                                    checked
                                    onChange={(e) => { setPaymentMethod(e.target.value) }}
                                />{" "}
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div>
                            <button className="button primary" type="submit">tiếp tục</button>
                        </div>
                    </li>
                </ul>




            </form>
        </div>
    );
}

export default PaymentMethodScreen;
