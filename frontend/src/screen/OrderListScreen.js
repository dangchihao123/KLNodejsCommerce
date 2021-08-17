import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

function format1(n, currency) {
  return  n.toFixed(0).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  })+ currency ;
}

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET })
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, successDelete, sellerMode, userInfo._id])
  const deleteHandler = (order) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      dispatch(deleteOrder(order._id));
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-center">Quản lý đơn hàng</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID ĐƠN HÀNG</th> */}
                <th>TÊN KHÁCH HÀNG</th>
                <th>SỐ ĐIỆN THOẠI</th>
                <th>HÌNH THỨC THANH TOÁN</th>
                <th>SẢN PHẨM</th>
                <th>NGÀY ĐẶT HÀNG</th>
                <th>TỔNG ĐƠN HÀNG (VNĐ)</th>
                <th>NGÀY THANH TOÁN</th>
                <th>NGÀY GIAO HÀNG</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* <td>{order._id}</td> */}
                  <td>{order.user.name}</td>
                  <td>{order.shippingAddress.phoneNumber}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderItems.map(item =><ul><li>- {item.name}</li></ul>)}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{format1(order.totalPrice, '')}</td>
                  <td>{order.isPaid ?'Đã thanh toán '+ order.paidAt.substring(0, 10) : 'Chưa thanh toán'}</td>
                  <td>
                    {order.isDelivered
                      ?'Đã giao hàng '+ order.deliveredAt.substring(0, 10)
                      : 'Chưa giao hàng'}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <i class="fa fa-info" aria-hidden="true"></i> Chi tiết
                  </button>
                    <button
                      type='button'
                      className='btn'
                      onClick={() => deleteHandler(order)}
                    >
                     <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
