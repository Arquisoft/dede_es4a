import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import User, {IUser} from "../models/user";

export const validateSignUp = [
    body("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Username can't be empty")
        .isLength({min: 5})
        .withMessage("Minimun 5 characters"),
    body("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Email incorrect"),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password can't be empty")
        .isLength({min: 8})
        .withMessage("Password must be 8 charactes long")
        .isStrongPassword()
        .withMessage("Password must be alphanumeric and contain a special character"),
    body("confirmPassword")
        .custom(async (value, { req }) => {
            if (value !== req.body.password)
                throw new Error("Password and confirm password don't match")
        }),
    body("dni")
        .isLength({min: 9, max: 9}),
    (req: Request, res: Response, next : NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(423).json({ errors: errors.array()[0], msg: errors.array()[0].msg });

        next();
    }
];

export const validateToken = (req : Request, res: Response, next : NextFunction) => {
    
    const accessToken = req.headers.authorization;
    if (!accessToken){
        res.status(400).send('Access denied');
    } else {
        jwt.verify(accessToken, process.env.SECRET!, (err, user) => {
            if(err){
                res.status(400).send('Access denied, token expired or incorrect');
            } else {
                next();
            }
        });
    }
};

export const validateRol = (req: Request, res: Response, next: NextFunction) => {
    const username = req.headers.username;

    if (!username)
        res.status(400).send('Access denied');
    else {
        User.findOne({ username: username }, (error: Error, user: IUser) => {
            if (error)
                res.status(400).send('Error finding the user');
            else {
                if (user) {
                    if (user.rol === 1)
                        next();
                    else
                        res.status(400).send('Current user is not an admin');     
                } else
                    res.status(400).send('User not found')
            }
        });
    }
}
