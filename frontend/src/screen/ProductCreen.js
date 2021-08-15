import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, createReview } from '../actions/ProductActions';
import Rating from '../component/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/ProductConstants';
import MessageBox from '../component/MessageBox';
import LoadingBox from '../component/LoadingBox';


function ProductCreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const productId = props.match.params.id;

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Bạn đã bình luận thành công');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(detailsProduct(productId));
        return () => {
            //
        };
    }, [dispatch, productId, successReviewCreate]);
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name })
            );
        } else {
            alert('Nhập nhận xét và đánh giá');
        }
    };
    return (
        <div className="back-to-result">
            <Link to="/">Trở về trang chủ</Link>
            {loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="product"></img>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.name}</h4>
                                    </li>
                                    <li>
                                        <Rating
                                            rating={product.rating}
                                            numReviews={product.numReviews}
                                        >
                                        </Rating>
                                        {/* {product.rating} Stars ({product.numReview} Review) */}
                                    </li>
                                    <li>
                                        Giá:{" "}<b>${product.price}</b>
                                    </li>
                                    <li>
                                        <b> Mô tả sản phẩm: </b>
                                        <div>
                                            {product.description}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>
                                        Giá: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        Trạng thái: {product.countInStock > 0 ? "Còn hàng" : "hết hàng"}
                                    </li>
                                    <li>
                                        Số lượng: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                            {[...Array(product.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 && <button onClick={handleAddToCart} className="button"> Thêm vào giỏ hàng</button>
                                        }
                                    </li>
                                </ul>
                            </div>
                            <div className="form">
                                <ul className="form-container">
                                    <li>
                                        <h2 id="reviews"><b>NHẬN XÉT - ĐÁNH GIÁ TỪ KHÁCH HÀNG</b></h2></li>
                                    {product.reviews.length === 0 && (
                                        <MessageBox>chưa có nhận xét nào</MessageBox>
                                    )}
                                    {product.reviews.map((review) => (
                                        <li key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating rating={review.rating} caption=" "></Rating>
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </li>
                                    ))}
                                    {userInfo ? (
                                        <form className="" onSubmit={submitHandler}>
                                            <li>
                                                <h2>viết nhận xét của bạn</h2>
                                            </li>
                                            <li>
                                                <label htmlFor="rating">Số sao đánh giá</label>
                                                <select
                                                    id="rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                  
                                                    <option value="1">1 sao - tệ</option>
                                                    <option value="2">2 sao - trung bình</option>
                                                    <option value="3">3 sao - tốt</option>
                                                    <option value="4">4 sao - rất tốt</option>
                                                    <option value="5">5 sao - tuyệt vời</option>
                                                </select>
                                            </li>
                                            <li>
                                                <label htmlFor="comment">Bình luận</label>
                                                <textarea
                                                    id="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></textarea>
                                                <label />
                                                <button className="button" type="submit">
                                                    Nhận xét
                                                    </button>
                                            </li>
                                            <li>
                                                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                {errorReviewCreate && (
                                                    <MessageBox variant="danger">
                                                        {errorReviewCreate}
                                                    </MessageBox>
                                                )}
                                            </li>
                                        </form>
                                    ) : (
                                        <MessageBox>
                                            mời bạn  <Link to="/signin"><b>Đăng nhập</b></Link> để viết bình luận
                                        </MessageBox>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
            }

        </div>

    );

}

export default ProductCreen;
