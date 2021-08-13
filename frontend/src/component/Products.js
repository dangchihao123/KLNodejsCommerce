import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Products(props) {
    const { product } = props;
    return (
    //     <div key={product._id} className="card">
    //         <Link to={`/product/${product._id}`}>
    //         <img className="medium" src={product.image} alt={product.name} style={{ width: 150, height: 150}}/>
    //         </Link>
    //         <div className="card-body">
    //             <Link to={`/product/${product._id}`}>
    //                 <h2>{product.name}</h2>
    //             </Link>
    //             <Rating
    //                 rating={product.rating}
    //                 numReviews={product.numReviews}
    //             ></Rating>
    //         <div className="row">
    //             <div className="price">${product.price}</div>
    //         </div>
    //         </div>
    //   </div>
    <>
    <ul className="products">
                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="product" style={{width:'250px', height:'300px'}} /></Link>
                                <div className="product-name">
                                    <Link to={'/product/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </div>
                        </li>
                    
              
            </ul>
            </>
    )
}
export default Products;