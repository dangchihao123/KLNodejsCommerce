import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

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
                            <th>TỔNG TIỀN</th>
                            <th>NGÀY THANH TOÁN</th>
                            <th>NGÀY GIAO HÀNG</th>
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
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? "Đã thanh toán "+ order.paidAt.substring(0, 10) : 'Chưa thanh toán'}</td>
                                <td>
                                    {order.isDelivered
                                        ? "Đã giao hàng "+ order.deliveredAt.substring(0, 10)
                                        : 'Chưa giao hàng'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
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