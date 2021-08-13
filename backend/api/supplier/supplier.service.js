const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO supplier(SUPPLIER_NAME, SUPPLIER_ADDRESS, SUPPLIER_PHONE, SUPPLIER_EMAIL, SUPPLIER_DESCRIPTION) VALUES (?,?,?,?,?)`,
        [
            data.SUPPLIER_NAME,
            data.SUPPLIER_ADDRESS,
            data.SUPPLIER_PHONE,
            data.SUPPLIER_EMAIL,    
            data.SUPPLIER_DESCRIPTION,
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getSupplier: callback => {
        pool.query(`select * from supplier`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getSupplierBySupplierId: (SUPPLIER_ID , callback)=>{
        pool.query(`select SUPPLIER_NAME, SUPPLIER_ADDRESS, SUPPLIER_PHONE, SUPPLIER_EMAIL, SUPPLIER_DESCRIPTION FROM supplier WHERE SUPPLIER_ID  = ?`,
        [SUPPLIER_ID],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateSupplier: (data, callback) => {
        pool.query(`UPDATE supplier SET SUPPLIER_NAME=?, SUPPLIER_ADDRESS=?, SUPPLIER_PHONE=?, SUPPLIER_EMAIL=?, SUPPLIER_DESCRIPTION=? WHERE SUPPLIER_ID = ?`, [
            data.SUPPLIER_NAME,
            data.SUPPLIER_ADDRESS,
            data.SUPPLIER_PHONE,
            data.SUPPLIER_EMAIL,    
            data.SUPPLIER_DESCRIPTION,
            data.SUPPLIER_ID          
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteSupplier: (SUPPLIER_ID, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM supplier WHERE SUPPLIER_ID = ?`,
        [SUPPLIER_ID],
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