const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO category(TITLE_CATE, META_TITLE_CA, CONTENT_CATE) VALUES (?,?,?)`,
        [
            data.TITLE_CATE,  
            data.META_TITLE_CA, 
            data.CONTENT_CATE,         
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getCategory: callback => {
        pool.query(`select * from category`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getCategoryByCategorytId: (ID_CATEGORY, callback)=>{
        pool.query(`select * category WHERE ID_CATEGORY = ?`,
        [ID_CATEGORY],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateCategory: (data, callback) => {
        pool.query(`UPDATE category SET TITLE_CATE=?, META_TITLE_CA=?, CONTENT_CATE=? WHERE ID_CATEGORY = ?`, [
            data.TITLE_CATE,  
            data.META_TITLE_CA, 
            data.CONTENT_CATE,
            data.ID_CATEGORY         
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteCategory: (ID_CATEGORY, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM category WHERE ID_CATEGORY = ?`,
        [ID_CATEGORY],
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