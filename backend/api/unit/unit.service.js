const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO unit(NAME_UNIT) VALUES (?)`,
        [
            data.NAME_UNIT,          
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getUnit: callback => {
        pool.query(`select * from unit`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getUnitByUnitId: (ID_UNIT, callback)=>{
        pool.query(`select ID_UNIT, NAME_UNIT FROM unit WHERE ID_UNIT = ?`,
        [ID_UNIT],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateUnit: (data, callback) => {
        pool.query(`UPDATE unit SET NAME_UNIT=? WHERE ID_UNIT = ?`, [
            data.NAME_UNIT,   
            data.ID_UNIT         
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteUnit: (ID_UNIT, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM unit WHERE ID_UNIT = ?`,
        [ID_UNIT],
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