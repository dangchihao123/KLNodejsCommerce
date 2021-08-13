const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO branch(ID_TYPE, ID_OWNER, NAME_BRANCH, ADDRESS_BRANCH, TEL_BRANCH, LOGO_BRANCH ) VALUES (?,?,?,?,?,?)`,
        [
            data.ID_TYPE,
            data.ID_OWNER,
            data.NAME_BRANCH,
            data.ADDRESS_BRANCH,
            data.TEL_BRANCH,
            data.LOGO_BRANCH          
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getBranch: callback => {
        pool.query(`select * from branch`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getBranchByBranchId: (ID_BRANCH, callback)=>{
        pool.query(`select ID_TYPE, ID_OWNER, NAME_BRANCH, ADDRESS_BRANCH, TEL_BRANCH, LOGO_BRANCH FROM branch WHERE ID_BRANCH = ?`,
        [ID_BRANCH],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateBranch: (data, callback) => {
        pool.query(`UPDATE branch SET ID_TYPE=?, ID_OWNER=?, NAME_BRANCH=?, ADDRESS_BRANCH=?, TEL_BRANCH=?, LOGO_BRANCH=? WHERE ID_BRANCH = ?`, [
            data.ID_TYPE,   
            data.ID_OWNER,
            data.NAME_BRANCH,
            data.ADDRESS_BRANCH,
            data.TEL_BRANCH,
            data.LOGO_BRANCH,
            data.ID_BRANCH         
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteBranch: (ID_BRANCH, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM branch WHERE ID_BRANCH = ?`,
        [ID_BRANCH],
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