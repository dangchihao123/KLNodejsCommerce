import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../component/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import axios from 'axios';
import { useEffect } from 'react';


const ShippingAddressScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    // const [tinh, setTinh] = useState(shippingAddress.tinh);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, phoneNumber, city, postalCode, country }));
        props.history.push('/payment');
    }
    // useEffect(() => {
    //     const fecthData = async () => {
    //         try {
    //             const { data } = await axios.get('http://localhost:3001/api/tinh');
    //             setTinh(data);
    //         } catch (error) {
    //             console.log('not found', error);
    //         }
    //     }
    //     fecthData();
    //     return () => {
    //         //
    //     }
    // }, [tinh]);
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h1>
                            Địa chỉ giao hàng
                    </h1>
                    </li>
                    <li>
                        <label htmlFor="fullName">Tên đầy đủ</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Nhập họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="address">địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                    </li>
                    <li>
                        <label htmlFor="address">số điện thoại</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />

                    </li>
                    <li>
                        <label htmlFor="city">Tỉnh/thành phố</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="Nhập Tỉnh hoặc thành phố"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </li>
                    {/* <li>
                        <label htmlFor="tinh">Tỉnh/Thành phố</label>
                        
                        <select
                            // value={tinh}
                            // onChange={(e) => setTinh(e.target.value)}
                        >
                           {tinh.map(t => (
                                <option
                                    key={t._id}
                                    value={t.name}
                                >
                                    {t.name}
                                </option>
                            ))}
                        </select>
                        
                    </li> */}
                    <li>
                        <label htmlFor="postalCode">Mã bưu điện</label>
                        <input
                            type="text"
                            id="postalCode"
                            placeholder="Nhập mã bưu điện"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="country">Quốc gia</label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Nhập quốc gia"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <button className="button primary" type="submit">
                            Tiếp tục
                    </button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default ShippingAddressScreen;
