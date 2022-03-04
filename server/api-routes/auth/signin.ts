import { Router, Request, Response } from 'express';
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../../models/user";
import connect from '../../config/db';
import { env } from '../../config/env';

const { JSONWebToken } = env;

const router = Router();

// TODO: will implement if time permits
// router.post('/google', (req: Request, res: Response) => {
//     // login with google
// });

// TODO: will implement if time permits
// router.post('/facebook', (req: Request, res: Response) => {
//     // login with facebook
// });

router.post('/email', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email && password) {
        const userModel = mongoose.model('users', UserModel);
        await connect();
        userModel.findOne({ email: email }, async function (err, existingUser) {
            if (existingUser) {
                await bcrypt.compare(password, existingUser.password, function (err, passwordMatch) {
                    if (passwordMatch) {
                        const user = {
                            userId: existingUser.userId,
                            email: email,
                            token: null,
                            isOnline: false,
                        }
                        const token = jwt.sign(
                            { email: user.email },
                            JSONWebToken.Key,
                            {
                                expiresIn: "1hr",
                            }
                        );
                        user.token = token;
                        user.isOnline = true;
                        res.status(200).send({
                            status: 200,
                            message: "Logged In!",
                            user,
                        });
                    } else {
                        res.status(500).send({
                            status: 500,
                            message: "Incorrect password!"
                        });
                    };
                });
            } else {
                res.status(500).send({
                    status: 500,
                    message: "Invalid Email!"
                });
            };
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing Email or Password!"
        });
    };
});

export default router;