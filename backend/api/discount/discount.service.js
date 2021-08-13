const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO discount(NAME_DC, DISCRIPTION_DC, PERCENT_DC, DC_CREATED_AT, DC_MODIFIED_AT) VALUES (?,?,?,?,?)`,
        [
            data.NAME_DC,
            data.DISCRIPTION_DC,
            data.PERCENT_DC,
            data.DC_CREATED_AT,    
            data.DC_MODIFIED_AT
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getDiscount: callback => {
        pool.query(`select * from discount`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getDiscountByDiscountId: (ID_DISCOUNT , callback)=>{
        pool.query(`select NAME_DC, DISCRIPTION_DC, PERCENT_DC, DC_CREATED_AT, DC_MODIFIED_AT FROM discount WHERE ID_DISCOUNT  = ?`,
        [ID_DISCOUNT ],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateDiscount: (data, callback) => {
        pool.query(`UPDATE discount SET NAME_DC=?, DISCRIPTION_DC=?, PERCENT_DC=?, DC_CREATED_AT=?, DC_MODIFIED_AT=? WHERE ID_DISCOUNT = ?`, [
            data.NAME_DC,
            data.DISCRIPTION_DC,
            data.PERCENT_DC,
            data.DC_CREATED_AT,    
            data.DC_MODIFIED_AT,
            data.ID_DISCOUNT          
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteDiscount: (ID_DISCOUNT, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM discount WHERE ID_DISCOUNT = ?`,
        [ID_DISCOUNT],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
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