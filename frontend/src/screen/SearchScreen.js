import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/ProductActions';
import LoadingBox from '../component/MessageBox';
import MessageBox from '../component/MessageBox';
import Product from '../component/Products';

export default function SearchScreen(props) {
    const { name = 'all', category = 'all' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
  
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;
    useEffect(() => {
      dispatch(
        listProducts({
          name: name !== 'all' ? name : '',
          category: category !== 'all' ? category : '',
        })
      );
    }, [category, dispatch, name]);
  
    const getFilterUrl = (filter) => {
      const filterCategory = filter.category || category;
      const filterName = filter.name || name;
      return `/search/category/${filterCategory}`;
      // return `/search/category/${filterCategory}/name/${filterName}`;
    };
    return (
      <div>
        <div className="row">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>{products.length} Results</div>
          )}
        </div>
        <div className="row top">
          <div className="col">
            <h3>Danh mục</h3>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      <i class="fa fa-caret-right" aria-hidden="true"></i> {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-2">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }