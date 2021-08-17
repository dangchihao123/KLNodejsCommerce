import React, { useState, useEffect } from 'react';
import Products from '.././component/Products';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/ProductActions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '../component/Rating';
import Pagination from '../component/Pagination';
import Banner from '../component/Banner/Banner';

function format1(n, currency) {
    return  n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency ;
  }

function HomeScreen(props) {
    // const dispatch = useDispatch();
    // const productList = useSelector(state=>state. productList);
    // const {loading, err, products} = productList;
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [search, setSearch] = useState('');
    const [filterProduct, setFilterProduct] = useState([]);
    const [sortType, setSortType] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get("http://localhost:3001/api/products");
            setProducts(data);
        };
        fecthData();
        return () => {
            //
        };
        // dispatch(listProducts());
    }, []);

    useEffect(() => {
        setFilterProduct(
            products.filter(product => {
                return product.name.toLowerCase().includes(search.toLocaleLowerCase());
            })
        )
    }, [search, products]);

    useEffect(() => {
        const sortByPrice = (value) => {
            if (value === "lowest") {
                filterProduct.sort((a, b) => {
                    return a.price > b.price ? 1 : -1;
                })
            } else {
                if (value === "highest") {
                    filterProduct.sort((a, b) => {
                        return a.price < b.price ? 1 : -1;
                    })
                }
            }

        }
        setSortType(sortByPrice);
    }, [sortType]);
    // get product current
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = filterProduct.slice(indexOfFirstProduct, indexOfLastProduct);
    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    return (
        <div>
            <div className="input-group">
                <div className="form-outline">
                    <input
                        type="search"
                        id="form1"
                        className="form-control"
                        placeholder="Tìm sản phẩm..."
                        onChange={e => setSearch(e.target.value)}
                    />

                </div>
                <div className="search">
                    <i className="fa fa-search button" aria-hidden="true" ></i>
                </div>
                <div className="filter-sort">
                    {" "}
                    {/* <select className='select-filter' value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option>---Tìm theo giá---</option>
                        <option value="lowest">Gía tăng dần</option>
                        <option value="highest">Gía giảm dần</option>
                    </select>{" "} */}
                </div>
            </div>
            <div className="banner">
                           <Banner />
            </div>
             <div className="filter-result">
                <p className="count-product"><b>SẢN PHẨM MỚI {products.length}</b></p>
                <hr />
            </div>
            <ul className="products">
                {
                    currentProducts.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="product" style={{width:'300px', height:'300px'}} /></Link>
                                <div className="product-name">
                                    <Link to={'/product/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">{format1(product.price,'VNĐ' )} </div>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </div>
                        </li>
                    )
                }
            </ul>
            <Pagination
                productPerPage={productPerPage}
                totalProducts={products.length}
                paginate={paginate}
            />
        </div>
    );

}

export default HomeScreen;
