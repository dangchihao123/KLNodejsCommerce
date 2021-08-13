const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO product( ID_CATEGORY, BRAND_ID, ID_DISCOUNT , NAME_PRODUCT , PRICE_PRODUCT, QUANTITY_PRODUCT, DESCRIPTION_PRODUCT) VALUES (?,?,?,?,?,?,?)`,
        [
            data.ID_CATEGORY,   
            data.BRAND_ID,   
            data.ID_DISCOUNT,   
            data.NAME_PRODUCT,   
            data.PRICE_PRODUCT,   
            data.QUANTITY_PRODUCT,   
            data.DESCRIPTION_PRODUCT,    
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getProduct: callback => {
        pool.query(`select * from product`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getProductByProductId: (ID_PRODUCT , callback)=>{
        pool.query(`select ID_PRODUCT, ID_CATEGORY, BRAND_ID, ID_DISCOUNT, NAME_PRODUCT, PRICE_PRODUCT, QUANTITY_PRODUCT, DESCRIPTION_PRODUCT  FROM product WHERE ID_PRODUCT  = ?`,
        [ID_PRODUCT ],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateProduct: (data, callback) => {
        pool.query(`UPDATE product SET ID_CATEGORY=?, BRAND_ID=?, ID_DISCOUNT=?, NAME_PRODUCT=?, PRICE_PRODUCT=?,QUANTITY_PRODUCT=?,DESCRIPTION_PRODUCT=? WHERE ID_PRODUCT = ?`, [
            data.ID_CATEGORY,   
            data.BRAND_ID,   
            data.ID_DISCOUNT,   
            data.NAME_PRODUCT,   
            data.PRICE_PRODUCT,   
            data.QUANTITY_PRODUCT,   
            data.DESCRIPTION_PRODUCT, 
            data.ID_PRODUCT,
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    getProductByProductName: (name , callback)=>{
        pool.query("SELECT * FROM product WHERE NAME_PRODUCT LIKE '%" + name + "%'",
        [name],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results)
        }
        )
    },
    deleteProduct: (ID_PRODUCT, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM product WHERE ID_PRODUCT = ?`,
        [ID_PRODUCT],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    deleteAllProduct: callback => {
        pool.query(`DELETE FROM product`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    // getUserByUserEmail: (EMAIL_USER, callback)=>{
    //     pool.query(`select * FROM user WHERE EMAIL_USER = ?`,
    //     [EMAIL_USER],
    //     (err, results, fields) => {
    //         if(err){
    //             callback(err)
    //         }
    //         return callback(null, results[0])
    //     })
    // }
}