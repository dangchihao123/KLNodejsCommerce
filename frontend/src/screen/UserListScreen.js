// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listUsers, deleteUser, } from '../actions/userActions';
// import LoadingBox from '../component/LoadingBox';
// import MessageBox from '../component/MessageBox';
// import { USER_DETAILS_RESET } from '../constants/userConstants';

// function UserListScreen(props) {
//   const userList = useSelector((state) => state.userList);
//   const { loading, error } = userList;

//   const userDelete = useSelector((state) => state.userDelete);
//   const {
//     loading: loadingDelete,
//     error: errorDelete,
//     success: successDelete,
//   } = userDelete;

//   const [users, setUsers] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fecthData = async () => {
//         const { data } = await axios.get("http://localhost:3001/api/users");
//         setUsers(data.users);
//     };
//     fecthData();
//     return () => {
//         //
//     };
// }, []);
//   console.log(users)
//   useEffect(() => {
//     // dispatch(listUsers());
//     dispatch({
//       type: USER_DETAILS_RESET,
//     });
//   }, [dispatch, successDelete]);
//   const deleteHandler = (user) => {
//     if (window.confirm('Are you sure?')) {
//       dispatch(deleteUser(user._id));
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-center">Quản lý Users</h1>
//       {loadingDelete && <LoadingBox></LoadingBox>}
//       {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
//       {successDelete && (
//         <MessageBox variant="success">User Deleted Successfully</MessageBox>
//       )}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>NAME</th>
//             <th>EMAIL</th>
//             <th>IS SELLER</th>
//             <th>IS ADMIN</th>
//             <th>ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user =>
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.isSeller ? 'YES' : ' NO'}</td>
//               <td>{user.isAdmin ? 'YES' : 'NO'}</td>
//               <td>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => props.history.push(`/user/${user._id}/edit`)}
//                 >
//                   Sửa
//                   </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => deleteHandler(user)}
//                 >
//                   Xóa
//                   </button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default UserListScreen;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, , successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Bạn thật sự muốn xóa?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1 className="text-center">Quản lý Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>EMAIL</th>
              {/* <th>IS SELLER</th> */}
              <th>NGƯỜI QUẢN TRỊ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.isSeller ? 'YES' : ' NO'}</td> */}
                <td>{user.isAdmin ? 'PHẢI' : 'KHÔNG'}</td>
                <td>
                <button
                    type="button"
                    className="btn btn"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn"
                    onClick={() => deleteHandler(user)}
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
  );
}