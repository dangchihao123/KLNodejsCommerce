const { create, getCategory, getCategoryByCategorytId, updateCategory, deleteCategory } = require('./category.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
// const { sign } = require('jsonwebtoken');
module.exports = {
    createCategory: (req, res)=>{
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
    getCategoryByCategorytId: (req, res)=> {
        const id = req.params.id;
        getCategoryByCategorytId(id, (err, results)=>{
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
    getCategory: (req, res)=>{
        getCategory((err, results)=>{
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
    updateCategory: (req, res)=>{
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.PASSWORD_USER = hashSync(body.PASSWORD_USER, salt);
        updateCategory(body, (err, results)=>{
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
    deleteCategory: (req, res)=>{
        const data = req.params.id;
        deleteCategory(data, (err, result)=>{
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