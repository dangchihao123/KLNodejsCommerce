import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    useEffect(() => {
        if (!user) {
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        return () => {
            //
        };
    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp, vui lòng nhập lại! ');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }
    return (
        <div className="form">
            <form className="" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <div>
                            <h1>Thông tin khách hàng</h1>
                        </div>
                    </li>
                    {
                        loading ? <LoadingBox></LoadingBox>
                            :
                            error ? <MessageBox variant='danger'>{error}</MessageBox>
                                :
                                <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && (
                                <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                )}
                                {successUpdate && (
                                <MessageBox variant="success">
                                    Cập nhật thông tin thành công
                                </MessageBox>
                                )}
                                    <li>
                                        <label htmlFor="name">Họ và tên</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </li>

                                    <li>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="mật khẩu"
                                            onChange={(e) => setPassword(e.target.value)}
                                            // disabled
                                            required
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="nhập lại mật khẩu"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            // disabled
                                            required
                                        />
                                    </li>
                                    <li>
                                        <label />
                                        <button className=" button primary" type="submit">Cập nhật</button>
                                    </li>
                                </>
                    }
                </ul>

            </form>
        </div>
    );
}

export default ProfileScreen;
