const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO brand(BRAND_NAME, BRAND_DESCRIPTION, FOUNDED_YEAR, BRAND_COUNTRY) VALUES (?,?,?,?)`,
        [
            data.BRAND_NAME,   
            data.BRAND_DESCRIPTION,   
            data.FOUNDED_YEAR,   
            data.BRAND_COUNTRY,   
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getBrand: callback => {
        pool.query(`select * from brand`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getBrandByBrandId: (BRAND_ID, callback)=>{
        pool.query(`select id_brand, name_brand, description FROM brand WHERE BRAND_ID = ?`,
        [BRAND_ID],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateBrand: (data, callback) => {
        pool.query(`UPDATE brand SET BRAND_NAME=?, BRAND_DESCRIPTION=?, FOUNDED_YEAR=?, BRAND_COUNTRY=? WHERE BRAND_ID = ?`, [
            data.BRAND_NAME,   
            data.BRAND_DESCRIPTION,   
            data.FOUNDED_YEAR,   
            data.BRAND_COUNTRY,  
            data.BRAND_ID
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteBrand: (BRAND_ID, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM brand WHERE BRAND_ID = ?`,
        [BRAND_ID],
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