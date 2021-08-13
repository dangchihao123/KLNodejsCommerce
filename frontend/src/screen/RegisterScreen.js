import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';


function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [props.history, userInfo, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('mật khẩu và mật khẩu nhập lại không trùng nhau!');
        } else {
            dispatch(register(name, email, password));
        }

    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h1>
                        <b>Tạo tài khoản</b>
                    </h1>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlfor="name">
                        Họ và tên
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlfor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlfor="password">
                        Mật khẩu
                    </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <label htmlfor="rePassword">
                        nhập lại mật khẩu
                    </label>
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Đăng ký</button>
                </li>
                <li>

                    <Link to={`/signin?redirect=${redirect}`}>Đến trang đăng nhập</Link>
                </li>
            </ul>
        </form>
    </div>



}

export default RegisterScreen;
