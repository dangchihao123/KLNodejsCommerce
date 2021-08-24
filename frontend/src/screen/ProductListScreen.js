

import React, { useEffect, useState } from 'react';
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


function format1(n, currency) {
  return  n.toFixed(0).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  })+ currency ;
}
function format(number) {

  var decimalSeparator = ".";
  var thousandSeparator = ",";

  // make sure we have a string
  var result = String(number);

  // split the number in the integer and decimals, if any
  var parts = result.split(decimalSeparator);

  // if we don't have decimals, add .00
  if (!parts[1]) {
    parts[1] = "0";
  }

  // reverse the string (1719 becomes 9171)
  result = parts[0].split("").reverse().join("");

  // add thousand separator each 3 characters, except at the end of the string
  result = result.replace(/(\d{3}(?!$))/g, "$1" + thousandSeparator);

  // reverse back the integer and replace the original integer
  parts[0] = result.split("").reverse().join("");

  // recombine integer with decimals
  return parts.join(decimalSeparator);
}


export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(products);

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
        <i className="fa fa-plus" aria-hidden="true"></i> Thêm sản phẩm
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
              <th>GIÁ SẢN PHẨM (VNĐ)</th>
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
                <td>{format(product.price ) } VNĐ</td>
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