# làm việc với Redux thông qua hooks
 - useSelector()
 - useDispatch()
1. setup redux store
 - reducer & Root reducer (tổng hợp các reducer lại với nhau)
 - Action creator
 - Store
 2. Setup redux provider
 -packet 'react-redux' giúp cho ta kết nối vào trong redux từ react để sủ dụng thì cài vào.

 ---- bắt đầu dự án xây dựng website thương mại---
 1. xây dựng giao diện, hiển thị sản phẩm
 - html, css, boostrap
 2. tạo project reactjs
 - npm install create-react-app frontend
 - npm start
 - xóa những file ko cần thiết
 - copy code file index.html qua App.js
 - copy code style.css qua index.css
 - thay đổi class thành className
 - tạo file data.js đổ dữ liệu ra component
 3. đưa code lên github
 4. tạo rating component và product component
 - tạo components/Rating.js
 - tạo div.rating và style
 - tạo product component 
 - sử dụng Rating component 
 5. xây dựng màn hình chi tiết sản phẩm
 - cài đặt react-router-dom
 - sử dụng BrowserRouter và Route hiển thị HomeScreen
 - Tạo HomeScreen.js
 - thêm mã nguồn danh sách sản phẩm vào đó
 - tạo ProductScreen.js
 - add new Route from product details to App.js
 - tạo 3 cột cjo hình ảnh sản phẩm, thông tin và action
 6. tạo sever nodejs
 - run npm init in root folder
 - update package.json set type: module
 - add .js to imports
 - npm install express
 - create sever.js
 - add start command as node backend/sever.js
 - required express
 - create route for / return backend is ready
 - move products.js from fronend to backend
 - create route for /api/products
 - return products
 - run npm start
 7. load Products from backend
 - edit HomeScreen.js
 - define products, loading and error
 - create useEffect
 - define async fetchData and call it 
 - install axios
 - get data from /api/products
 - show them in the list
 - create Loading component
 - create MessageBox component
 - use them in HomeScreen
 8. add redux to HomeScreen
 - npm install redux react-redux
 - Create store.js
 - initState = {products:[]}
 - reducer = (state, action)=> switch LOAD_PRODUCTS: {products: action.payload}
 - export default createStore(reducer, initState)
 - edit HomeScreen.js
 - shopName = useSelector(state=>state.products)
 - const dispatch = useDispatch()
 - useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data}))
 - add store to index.js
 9. add redux to ProductScreen
 - create product details constants, action and reducers
 - add reducer to store.js
 - use action in ProductScreen.js
 - add /api/product/:id to backend api
 10. handler add to cart button
 - handler add to cart in ProductScreen.js
 - create CartScreen.js
 11. emplement add to cart ( triển khai thêm vào giỏ hàng)
 - create addtoCart constants, actions, reducers
 - add reducer to store.js
 - use action in CartScreen.js
 - render cartItems.length 
 12. build Cart Screen
 - create 2 colums for cart items and cart action
 - cartItém.length === 0? cart is empty
 - show item image, name, qty, and price
 - proceed to checkout button
 - Implement remove from cart action
13. Implement remove from cart action
- create removeFromCart constants, action and reducer
- add reducer to store.js
- use action in Cartscreen.js
14. connect to mongoDB
- npm install mongoose
- connect to mongodb
- create config.js
- npm install dotenv
- export MONGODB_URL
- create userSchema and userModel
- create model/productModel.js
- create productSchema and productModel
- create userRoute
- seed sample data
15. Create Sign-in Backend
- create .signin api
- check email and password
- generate token
- install json web token
- install dotenv
- return token and data
- test using postman
16. Design signin Screen
- create SigninScreen
- render email and password fields
- create signin constants, actions and reducer
- update header based on user login



