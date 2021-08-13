const { create, getTag, getTagByTagId, updateTag, deleteTag } = require('./tag.service');
// const { genSaltSync, hashSync, compareSync } = require('bcrypt');
// const { sign } = require('jsonwebtoken');
module.exports = {
    createTag: (req, res)=>{
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.PASSWORD_USER = hashSync(body.PASSWORD_USER, salt);
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getTagByTagId: (req, res)=> {
        const id = req.params.id;
        getTagByTagId(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "record not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getTag: (req, res)=>{
        getTag((err, results)=>{
            if(err){
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateTag: (req, res)=>{
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.PASSWORD_USER = hashSync(body.PASSWORD_USER, salt);
        updateTag(body, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json(
                {
                    success: 1,
                    message: "update successfully"
                }
            );
        })
    },
    deleteTag: (req, res)=>{
        const data = req.params.id;
        deleteTag(data, (err, result)=>{
            if(err){
                console.log(err)
                return
            }
            // if(!result){
            //     return res.json({
            //         success: 0,
            //         message: "record not found"
            //     })
            // }
            return res.json({
                success: 1,
                message: "delete successfully"
            })
        })
    },
    // login: (req, res)=>{
    //     const body = req.body;
    //     getUserByUserEmail(body.EMAIL_USER, (err, results)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         if(!results){
    //             return res.json({
    //                 success:0,
    //                 data: "Invilid email or password"
    //             });
    //         }
    //         const result = compareSync(body.PASSWORD_USER, results.PASSWORD_USER);
    //         if(result){
    //             results.PASSWORD_USER = undefined;
    //             const jsontoken = sign({result: results}, '1',{
    //                 expiresIn: "1h"
    //             });
    //             return res.json({
    //                 success: 1,
    //                 message: "login successfully",
    //                 token: jsontoken
    //             });
    //         }else{
    //             return res.json({
    //                 success:0,
    //                 data: "Invilid email or password"
    //             });
    //         }
    //     })
    // }
}