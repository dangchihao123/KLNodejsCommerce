import axios from "axios";
import {
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNOUT, USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";


const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.put(`http://localhost:3001/api/users/${user._id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
};

const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.delete(`http://localhost:3001/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
};

const listUsers = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.get('http://localhost:3001/api/users', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_LIST_FAIL, payload: message });
    }
};

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("http://localhost:3001/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.respones && error.response.data.message
                ? error.response.data.message
                : "Email hoặc mật khẩu không đúng, vui lòng nhập lại!"
        })
    }
}
const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
    // document.location.location.href = '/signin';
    document.location.href = '/signin';
}
const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("http://localhost:3001/api/users/register", { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.respones && error.response.data.message
                ? "Mời bạn điền thông tin cần đăng ký !"
                : "Email đã có người sử dụng, vui lòng nhập email khác"
        })
    }
}
const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();

    try {
        const { data } = await axios.get(`http://localhost:3001/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
}
const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`http://localhost:3001/api/users/profile`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  };
export { signin, register, signout, detailsUser, listUsers, deleteUser, updateUser, updateUserProfile }