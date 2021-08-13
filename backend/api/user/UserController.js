const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.PASSWORD_HASH = hashSync(body.PASSWORD_HASH, salt);
        create(body, (err, results) => {
            if (err) {
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
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
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
    getUser: (req, res) => {
        // // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // // Request methods you wish to allow
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // // Request headers you wish to allow
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // // Set to true if you need the website to include cookies in the requests sent
        // // to the API (e.g. in case you use sessions)
        // res.setHeader('Access-Control-Allow-Credentials', true);

        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.PASSWORD_HASH = hashSync(body.PASSWORD_HASH, salt);
        updateUser(body, (err, results) => {
            if (err) {
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
    deleteUser: (req, res) => {
        const data = req.params.id;
        deleteUser(data, (err, result) => {
            if (err) {
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
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.EMAIL, (err, results) => {
            if (err) {
                (err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invilid email or password"
                });
            }
            const result = compareSync(body.PASSWORD_HASH, results.PASSWORD_HASH);
            if (result) {
                results.PASSWORD_HASH = undefined;
                const jsontoken = sign({ result: results }, '1', {
                    expiresIn: "3h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            } else {
                // return res.json({
                //     success: 0,
                //     data: "Invilid email or password"
                return res.status(400).message("Invilid email or password");
                // });
            }
        })
    }
}