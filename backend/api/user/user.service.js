const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO user(USERNAME, FIRST_NAME, LAST_NAME, ADDRESS, PASSWORD_HASH, EMAIL, PHONE, CREATE_AT, ID_ROLE) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            data.USERNAME,
            data.FIRST_NAME,
            data.LAST_NAME,
            data.ADDRESS,
            data.PASSWORD_HASH,
            data.EMAIL,   
            data.PHONE,  
            data.CREATE_AT,  
            data.ID_ROLE,  
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getUsers: callback => {
        pool.query(`select * from user`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getUserByUserId: (ID, callback)=>{
        pool.query(`select ID, USERNAME, FIRST_NAME, LAST_NAME, ADDRESS, PASSWORD_HASH, EMAIL, PHONE, CREATE_AT, ID_ROLE FROM user WHERE ID = ?`,
        [ID],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateUser: (data, callback) => {
        pool.query(`UPDATE user SET USERNAME=?, FIRST_NAME=?, LAST_NAME=?, ADDRESS=?, PASSWORD_HASH=?, EMAIL=?, PHONE=?, CREATE_AT=?, ID_ROLE=? WHERE ID = ?`, [
            data.USERNAME,
            data.FIRST_NAME,
            data.LAST_NAME,
            data.ADDRESS,
            data.PASSWORD_HASH,
            data.EMAIL,  
            data.PHONE,
            data.CREATE_AT,
            data.ID_ROLE,
            data.ID 
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0]);
        });    
    },
    deleteUser: (ID, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM user WHERE ID = ?`,
        [ID],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    getUserByUserEmail: (EMAIL, callback)=>{
        pool.query(`select * FROM user WHERE EMAIL = ?`,
        [EMAIL],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        })
    }
}