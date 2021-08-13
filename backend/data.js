const bcrypt = require('bcryptjs');

const data = {
    products: [
        {

            name: 'Đồng hồ thông minh BeU B2 Hồng3',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/231681/beu-b2-hong-300x300.jpg',
            price: 100,
            brand: "Apple",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Apple Watch S6 LTE 40mm viền nhôm dây cao su xanh',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/229033/apple-watch-s6-lte-40mm-vien-nhom-day-cao-su-ava-300x300.jpg',
            price: 80,
            brand: "Apple",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ thông minh Mi Watch',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/232899/mi-watch-255520-015535-300x300.jpg',
            price: 50,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ Nữ Michael Kors MK3203',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7264/198576/michael-kors-mk3203-vang-hong-0-300x300.jpg',
            price: 30,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Samsung Galaxy Watch 3 41mm viền thép hồng dây da',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/226475/samsung-galaxy-watch-3-41mm-thum-300x300.jpg',
            price: 50,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ Nam Larmes LM-TF004.OT49G.211.4NB - Optimus Prime',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7264/216231/larmes-lm-tf004-ot49g-211-4nb-nam-1-300x300.jpg',
            price: 10,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ thông minh BeU B2 Hồng1',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7264/216232/larmes-lm-tf004-sp14n-211-4nb-nam-1-300x300.jpg',
            price: 100,
            brand: "Apple",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Apple Watch S6 LTE 40mm viền nhôm dây cao su xanh2',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7264/218139/korlex-kl020-01-nu-1-300x300.jpg',
            price: 80,
            brand: "Apple",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ thông minh Mi Watch4',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/225569/kidcare-08s-ava-300x300.jpg',
            price: 50,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ Nữ Michael Kors MK32035',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/223747/huami-amazfit-gts-vang-ava-300x300.jpg',
            price: 30,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Samsung Galaxy Watch 3 41mm viền thép hồng dây da1',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/231683/beu-pt1-den-300x300.jpg',
            price: 50,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
        {

            name: 'Đồng hồ Nam Larmess LM-TF004.OT49G.211.4NB - Optimus Prime',
            category: 'Đồng hồ',
            image: 'https://cdn.tgdd.vn/Products/Images/7077/219147/samsung-galaxy-watch-active-2-40-mm-den-ava-300x300.jpg',
            price: 10,
            brand: "LG",
            rating: 4.5,
            numReviews: 10,
            description: ' beaitufull ',
            countInStock: 6,
        },
    ],
    categories: [
        {
            name: 'đồng hồ nam'
        },
        {
            name: 'đồng hồ nữ'
        },
        {
            name: 'đồng hồ dây da'
        },
        {
            name: 'đồng hồ dây kim loại'
        },
        {
            name: 'đồng hồ thông minh'
        },
    ],
    users: [
        {
            name: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('1', 8),
            isAdmin: true,
            isSeller: true,
        }
    ],
    tinh: [
        {
            name: 'An Giang'
        },
        {
            name: ' Bà Rịa-Vũng Tàu'
        },
        {
            name: 'Bạc Liêu'
        },
        {
            name: 'Bắc Kạn'
        },
        {
            name: 'Bắc Giang'
        },
        {
            name: 'Bắc Ninh'
        },
        {
            name: 'Bến Tre'
        },
        {
            name: 'Bình Dương'
        },
        {
            name: 'Bình Định'
        },
        {
            name: 'Bình Phước'
        },
        {
            name: 'Bình Thuận'
        },
        {
            name: 'Cà Mau'
        },
        {
            name: 'Cao Bằng'
        },
        {
            name: 'Cần Thơ (TP)'
        },
        {
            name: 'Đà Nẵng (TP)'
        },
        {
            name: 'Đắk Lắk'
        },
        {
            name: 'Đắk Nông'
        },
        {
            name: 'Điện Biên'
        },
        {
            name: 'Đồng Nai'
        },
        {
            name: 'Đồng Tháp'
        },
        {
            name: 'Gia Lai'
        },
        {
            name: 'Hà Giang'
        },
        {
            name: 'Hà Nam'
        },
        {
            name: 'Hà Nội (TP)'
        },
        {
            name: 'Hà Tây'
        },
        {
            name: 'Hà Tĩnh'
        },
        {
            name: 'Hải Dương'
        },
        {
            name: 'Hải Phòng (TP)'
        },
        {
            name: 'Hòa Bình'
        },
        {
            name: 'Hồ Chí Minh (TP)'
        },
        {
            name: 'Hậu Giang'
        },
        {
            name: 'Hưng Yên'
        },
        {
            name: 'Khánh Hòa'
        },
        {
            name: 'Kiên Giang'
        },
        {
            name: 'Kon Tum'
        },
        {
            name: 'Lai Châu'
        },
        {
            name: 'Lào Cai'
        },
        {
            name: 'Lạng Sơn'
        },
        {
            name: 'Lâm Đồng'
        },
        {
            name: 'Long An'
        },
        {
            name: 'Nam Định'
        },
        {
            name: 'Nghệ An'
        },
        {
            name: 'Ninh Bình'
        },
        {
            name: 'Ninh Thuận'
        },
        {
            name: 'Phú Thọ'
        },
        {
            name: 'An Giang'
        },
        {
            name: 'Phú Yên'
        },
        {
            name: 'Quảng Bình'
        },
        {
            name: 'Quảng Nam'
        },
        {
            name: 'Quảng Ngãi'
        },
        {
            name: 'Quảng Ninh'
        },
        {
            name: 'Quảng Trị'
        },
        {
            name: 'Sóc Trăng'
        },
        {
            name: 'Sơn La'
        },
        {
            name: 'Tây Ninh'
        },
        {
            name: 'Thái Bình'
        },
        {
            name: 'Thái Nguyên'
        },
        {
            name: 'Thanh Hóa'
        },
        {
            name: 'Thừa Thiên - Huế'
        },
        {
            name: 'Tiền Giang'
        },
        {
            name: 'Trà Vinh'
        },
        {
            name: 'Tuyên Quang'
        },
        {
            name: 'Vĩnh Long'
        },
        {
            name: 'Vĩnh Phúc'
        },
        {
            name: 'Yên Bái'
        },

    ]
}


module.exports = data;
