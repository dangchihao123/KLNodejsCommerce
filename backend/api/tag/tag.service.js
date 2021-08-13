const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO tag(TAG_TITLE_CA, TAG_META_TITLE, TAG_CONTENT) VALUES (?,?,?)`,
        [
            data.TAG_TITLE_CA,   
            data.TAG_META_TITLE,   
            data.TAG_CONTENT,    
        ],
        (error, results, fields)=>{
            if(error){
                return callback(error)
            }
            return callback(null, results)
        }
        ) 
    },
    getTag: callback => {
        pool.query(`select * from tag`,
        [],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        }
        )
    },
    getTagByTagId: (TAG_ID , callback)=>{
        pool.query(`select TAG_ID , TAG_TITLE_CA, TAG_META_TITLE, TAG_CONTENT FROM tag WHERE TAG_ID  = ?`,
        [TAG_ID ],
        (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        }
        )
    },
    updateTag: (data, callback) => {
        pool.query(`UPDATE tag SET TAG_TITLE_CA=?, TAG_META_TITLE=?, TAG_CONTENT=? WHERE TAG_ID = ?`, [
            data.TAG_TITLE_CA,   
            data.TAG_META_TITLE,   
            data.TAG_CONTENT,  
            data.TAG_ID
        ],
        (error, results, fields)=>{
            if(error){
                callback(error)
            }
            return callback(null, results[0])
        });    
    },
    deleteTag: (TAG_ID, callback)=>{
        // pool.query(`DELETE FROM user WHERE ID_USER = ?`,
        // [data.ID_USER],
        // (err, results, fields) => {
        //     if(err){
        //         callback(err)
        //     }
        //     return callback(null, results[0])
        // });
        pool.query(`DELETE FROM tag WHERE TAG_ID = ?`,
        [TAG_ID],
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