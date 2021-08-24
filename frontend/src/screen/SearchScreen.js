import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/ProductActions';
import LoadingBox from '../component/MessageBox';
import MessageBox from '../component/MessageBox';
import Product from '../component/Products';
import Rating from '../component/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
      const {
    // name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
  } = useParams();
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
          // name: name !== 'all' ? name : '',
          category: category !== 'all' ? category : '',
          min,
          max,
          rating,
          order,
        })
      );
    },  [category, dispatch, max, min, order, rating]);
    const getFilterUrl = (filter) => {
      const filterCategory = filter.category || category;
      // const filterName = filter.name || name;
      const filterRating = filter.rating || rating;
      const sortOrder = filter.order || order;
      const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
      const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
      return `/search/category/${filterCategory}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
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
            <div>{products.length} kết quả</div> 
          )}
          <div>{' '}&nbsp;
          Sắp xếp {' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Sản phẩm mới</option>
            <option value="lowest">Gía thấp đến cao</option>
            <option value="highest">Gía cao đến thấp</option>
            <option value="toprated">Số sao đánh giá cao đến thấp</option>
          </select>
        </div>
        </div>
        <div className="row top">
          <div className="col">
            <h3>Danh mục</h3>
            <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  > <i class="fa fa-caret-right" aria-hidden="true"></i>
                    Tất cả
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                  <i class="fa fa-caret-right" aria-hidden="true"></i>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Theo giá</h3>
              <ul>
              {prices.map((p) => (
                <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                    >
                      <i class="fa fa-caret-right" aria-hidden="true"></i> 
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              </div>
          <div>
            <h3>Theo số đánh giá</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>

                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>
          <div className="col-2">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>Không tìm thấy sản phẩm</MessageBox>
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