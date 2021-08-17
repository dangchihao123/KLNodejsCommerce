import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function format1(n, currency) {
    return  n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency ;
  }

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
                                <div className="product-price">{format1( product.price,'VNĐ')} </div>
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