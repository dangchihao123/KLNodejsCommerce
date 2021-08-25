import './index.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductCreen from './screen/ProductCreen';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import RegisterScreen from './screen/RegisterScreen'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
// import Search from './component/Search';
import ProfileScreen from './screen/ProfileScreen';
import PrivateRoute from './component/PrivateRoute';
import CategoriesScreen from './screen/CategoriesScreen';
import AdminRoute from './component/AdminRoute';
import OrderListScreen from './screen/OrderListScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import ProductCreateScreen from './screen/ProductCreateScreen';
import DashboardScreen from './screen/DashBoardScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import SupportScreen from './screen/SupportScreen';
import ChatBox from './component/ChatBox';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import { listProductCategories } from './actions/ProductActions';
import LoadingBox from './component/LoadingBox';
import MessageBox from './component/MessageBox';
import SearchScreen from './screen/SearchScreen';


function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const [searchTerm, setSearchTerm] = useState('');
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  // const searchHandler = () => {

  // }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            {/* <button className="button-icon" onClick={openMenu}>
              ☰
          </button> */}
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="title" to="/">CHÍ HÀO WATCH</Link>
            <Link to="#"><i className="fa fa-map-marker" aria-hidden="true"></i>{" "}304 yên chung, Lê Bình, Cái Răng, Cần Thơ</Link>
            <Link to="#"><i class="fa fa-phone" aria-hidden="true"></i>{" "}+843 280 235</Link>
            <Link to="#"><i class="fa fa-facebook" aria-hidden="true"></i>{" "}facebook</Link>
          </div>


          <div className="header-links">
            <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "} Giỏ hàng  {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}</Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="/profile">{userInfo.name} <i className="fa fa-caret-down" /></Link>
                  <ul className="dropdown-content">
                    <li className="order-history">
                            <Link to="/orderhistory">Lịch sử đơn hàng</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Đăng xuất</Link>
                    </li>
                    {/* <li>
                      <Link to="/profile">Thông tin</Link>
                    </li> */}
                  </ul>
                </div>
              ) : (
                <Link to="/signin"><i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập</Link>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="">
                    Admin <i className="fa fa-caret-down" />
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Quản lý sản phẩm</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Quản lý hóa đơn</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Quản lý người dùng</Link>
                    </li>
                    <li>
                      <Link to="/support">Hổ trợ khách hàng</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
            <h3>Danh mục</h3>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <i class="fa fa-caret-right" aria-hidden="true"></i> {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        {/* <CategoriesScreen /> */}
        <main className="main">
          <div className="content">
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/product/:id" component={ProductCreen} exact />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
            <Route
            path="/search/category/:category/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
            <AdminRoute path="/orderlist" component={OrderListScreen} />
            <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
            <AdminRoute
              path="/userlist"
              component={UserListScreen}
            >
            </AdminRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
            ></AdminRoute>
            {/* <AdminRoute
              path="/dashboard"
              component={DashboardScreen}
            ></AdminRoute> */}
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
            <Route path="/product/:id/edit" component={ProductEditScreen} exact />
            <Route path="/product" component={ProductCreateScreen} exact />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div className="container">
            <ul className="footer-ul">
              <li className="footer-li">
                <h1>HƯỚNG DẪN</h1>
                <Link to=""><p className="f">Thông Tin Liên Hệ</p></Link><br />
                <Link to=""><p className="f">Hỏi Đáp - Góp Ý</p></Link><br />
                <Link to=""><p className="f">Chính Sách Đổi Hàng</p></Link><br />
                <Link to=""><p className="f">Chính Sách Bảo Hành</p></Link><br />
              </li>
              <li>
                <h1>THAM KHẢO</h1>
                <Link to=""><p className="f">Thông Báo Mới</p></Link><br />
                <Link to=""><p className="f">Điều Khoản Sử Dụng</p></Link><br />
                <Link to=""><p className="f">Bảo Mật Thông Tin</p></Link><br />
                <Link to=""><p className="f">Ngưng Hiện Quảng Cáo</p></Link><br />
              </li>
              <li>
                <h1>LIÊN HỆ</h1>
                <p className="f">Tên pháp lý: CHÍ HÀO WACTH</p>
                <p className="f">304 yên chung, Lê Bình, Cái Răng, Cần Thơ</p>
                <p className="f">Số điện thoại: +843 280 235</p>
                <p className="f">Địa chỉ email: chihao@gmail.com</p>
                <div className="method-pay text-right">
                  <Link to="#"><img src="https://cdn3.dhht.vn/wp-content/uploads/2015/02/hinh-thuc-thanh-toan.png" alt="" /></Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="hotline-phone-ring-wrap">
        <div className="hotline-phone-ring">
          <div className="hotline-phone-ring-circle" />
          <div className="hotline-phone-ring-circle-fill" />
          <div className="hotline-phone-ring-img-circle">
            <div href="tel:0123456789" className="pps-btn-img">
              <img src="https://nocodebuilding.com/wp-content/uploads/2020/07/icon-call-nh.png" alt="Gọi điện thoại" width={50} />
            </div>
          </div>
        </div>
        <div className="hotline-bar">
          <div className="hotline-bar-number">
            <span className="text-hotline">0843 280 235</span>
          </div>
        </div>
      </div>
        </footer>
        
      </div>
    </BrowserRouter>

  );
  // }
}

export default App;

