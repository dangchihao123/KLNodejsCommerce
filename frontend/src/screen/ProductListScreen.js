// import React, { useEffect, useState } from 'react';
// import {
//      useDispatch,
//      useSelector
// } from 'react-redux';
// import {
//      createProduct,
//      deleteProduct,
//      listProducts,
// } from '../actions/ProductActions';
// import LoadingBox from '../component/LoadingBox';
// import MessageBox from '../component/MessageBox';
// import {
//      PRODUCT_CREATE_RESET,
//      PRODUCT_DELETE_RESET,
// } from '../constants/ProductConstants';
// import axios from 'axios';

// function ProductListScreen(props) {
//      // const sellerMode = props.match.path.indexOf('/seller') >= 0;
//      const productList = useSelector((state) => state.productList);
//      const { loading, error } = productList;

//      const userSignin = useSelector((state) => state.userSignin);
//      const { userInfo } = userSignin;
//      // const productList = useSelector((state) => state.productList);
//      // const { loading, error, products } = productList;
//      // const dispatch = useDispatch();
//      // useEffect(() => {
//      //   dispatch(listProducts());
//      // }, [dispatch]);

//      const [products, setProducts] = useState([]);

//      const productCreate = useSelector((state) => state.productCreate);
//      const {
//           loading: loadingCreate,
//           error: errorCreate,
//           success: successCreate,
//           product: createdProduct,
//      } = productCreate;

//      const productDelete = useSelector((state) => state.productDelete);
//      const {
//           loading: loadingDelete,
//           error: errorDelete,
//           success: successDelete,
//      } = productDelete;


//      const dispatch = useDispatch();
//      useEffect(() => {
//           const fecthData = async () => {
//                const { data } = await axios.get("http://localhost:3001/api/products");
//                setProducts(data);
//           };
//           fecthData();
//           return () => {
//                //
//           };
//      }, []);
//      useEffect(() => {
//           if (successCreate) {
//                dispatch({ type: PRODUCT_CREATE_RESET });
//                props.history.push(`/product/${createdProduct._id}/edit`);
//           }
//           if (successDelete) {
//                dispatch({ type: PRODUCT_DELETE_RESET });
//           }
//           dispatch(listProducts());
//           //   }, [dispatch]);
//      }, [createdProduct, dispatch, props.history, successCreate, successDelete]);
//      const deleteHandler = (product) => {
//           if (window.confirm('Bạn muốn xóa sản phẩm?')) {
//                dispatch(deleteProduct(product._id));
//                props.history.push('/productlist');
//           }
//      };
//      const createHandler = () => {
//           dispatch(createProduct());
//      };
//      return (
//           <div>
//                {/* <h1>Products</h1> */}
//                <div className="row">
//                     <h1>Quản lý sản phẩm</h1>
//                     <button type="button" className="btn btn-primary mr-10 " onClick={createHandler} style={{ textAlign: 'right' }}>
//                          Thêm sản phẩm
//         </button>
//                </div>
//                {loading ? <LoadingBox>{loadingDelete}</LoadingBox> : <MessageBox variant="danger">{errorDelete}</MessageBox>}
//                {/* {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
//                {loadingCreate && <LoadingBox></LoadingBox>}
//                {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
//                {loading ? (
//                     <LoadingBox></LoadingBox>
//                ) : error ? (
//                     <MessageBox variant="danger">{error}</MessageBox>
//                ) : (
//                     <table className="table table-bordered">
//                          <thead className="table table-bordered">
//                               <tr>
//                                    <th scope="col">ID</th>
//                                    <th scope="col">Tên sản phẩm</th>
//                                    <th scope="col">Gía</th>
//                                    {/* <th>IMAGE</th> */}
//                                    <th scope="col">Danh mục</th>
//                                    <th scope="col">Nhãn hiệu</th>
//                                    <th scope="col">Hành động</th>
//                               </tr>
//                          </thead>
//                          <tbody>
//                               {products.map((product) => (
//                                    <tr key={product._id}>
//                                         <td>{product._id}</td>
//                                         <td>{product.name}</td>
//                                         <td>{product.price}</td>
//                                         {/* <td>{product.image}</td> */}
//                                         <td>{product.category}</td>
//                                         <td>{product.brand}</td>
//                                         <td>
//                                              <button
//                                                   type="button"
//                                                   className="btn btn-success"
//                                                   onClick={() =>
//                                                        props.history.push(`/product/${product._id}/edit`)
//                                                   }
//                                              >
//                                                   Sửa
//                                              </button>
//                                              <button
//                                                   type="button"
//                                                   className="btn btn-danger"
//                                                   onClick={() => deleteHandler(product)}
//                                              >
//                                                   Xóa
//                                              </button>
//                                         </td>
//                                    </tr>
//                               ))}
//                          </tbody>
//                     </table>
//                )}
//           </div>
//      );
// }
// export default ProductListScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/ProductActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/ProductConstants';

export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const i = 1;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Bạn thật sự muốn xóa?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="row">
        <h1>Sản phẩm</h1>
        <button type="button" className="btn btn-primary" onClick={createHandler}>
        <i class="fa fa-plus" aria-hidden="true"></i> Thêm sản phẩm
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {/* <th>STT</th> */}
              <th>TÊN SẢN PHẨM</th>
              <th>GIÁ SẢN PHẨM</th>
              <th>DANH MỤC</th>
              <th>NHÃN HIỆU</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                {/* <td>{i++}</td> */}
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                   <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
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