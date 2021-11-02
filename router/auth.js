import express from "express";
import 'express-async-errors';
import { body } from "express-validator";
import * as AuthController from '../controller/authc.js'
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";//


const validateCredential=[
body('username').trim().isLength({min:3}).withMessage("아이디는 세글자 이상"),
body('password').isLength({min:4}).withMessage("비번은 4글자 이상"),
validate]
const validateSignup=[
    ...validateCredential,
    body('name').notEmpty().withMessage("name is missing"),
    body('email').isEmail().withMessage('invalid email'),
    body('url').isURL().withMessage('invalidURL').optional({nullable:true, checkFalsy:true})//주소를 아예 입력하지 않거나 텅텅빈 문자열일경우에도 OK
    
]

const router = express.Router();
router.get('/',AuthController.getAuth)
router.post('/login',validateCredential,AuthController.login);
router.post('/signup',validateSignup,
AuthController.addMember)
router.get('/me',isAuth,AuthController.me)


export default router;