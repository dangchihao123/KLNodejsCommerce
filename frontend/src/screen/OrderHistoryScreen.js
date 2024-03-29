import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

function format1(n, currency) {
    return  n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency ;
  }

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    console.log(orders)
    return (
        <div>
            <h1 className="text-center">Lịch sử đơn hàng</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID ĐƠN HÀNG</th>
                            <th>HÌNH THỨC THANH TOÁN</th>
                            <th>SẢN PHẨM ĐÃ MUA</th>
                            <th>NGÀY ĐẶT HÀNG</th>
                            <th>TỔNG TIỀN (VNĐ)</th>
                            {/* <th>THANH TOÁN</th> */}
                            <th>GIAO HÀNG</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.orderItems.map(item =><ul><li>- {item.name}</li></ul>)}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{format1(order.totalPrice, '')}</td>
                                {/* <td>{order.isPaid ? "Đã thanh toán "+ order.paidAt.substring(0, 10) : 'Chưa thanh toán'}</td> */}
                                <td>
                                    {order.isDelivered
                                        ? "Đã xác nhận "+ order.deliveredAt.substring(0, 10)
                                        : 'Chưa xác nhận'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            props.history.push(`/order/${order._id}`);
                                        }}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}