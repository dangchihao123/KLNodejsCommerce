import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
// import MessageBox from '../component/MessageBox';
// import { createBrowserHistory } from 'history';


function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    // console.log(redirect);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    // console.log(loading);

    // const { loading, error } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [props.history, redirect, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form className="form-login" onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h1>
                        <b>Đăng nhập</b>
                    </h1>
                </li>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {/* <li>
                    {loading && <div>Loading...</div>}
                    {error && <div variant="danger">{error}</div>}
                </li> */}
                <li>
                    <label htmlfor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlfor="password">
                        Mật khẩu
                    </label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Đăng nhập</button>
                </li>
                <li>
                    Bạn là khách hàng mới?
                </li>
                <li>
                    <Link to={`/register?redirect=${redirect}`} className="button secondary text-center" > Tạo tài khoản  </Link>
                </li>
            </ul>
        </form>
    </div>



}

export default SigninScreen;
