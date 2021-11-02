import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  'express-async-errors';
import * as userRepository from '../data/auth.js'

const jwtSecretKey = 'secretKey';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds =12;


export async function getAuth (req, res,next){
            res.status(201).send('GET /AUTH');

}

export async function addMember (req, res,next){
    const {username, password, name, email, url} = req.body;
    //중복 있음? //고유 아이디값 가져오기
    const found = await userRepository.findByUsername(username)
    if(found){
        return res.status(409).json({message:`${username} already exitss ${found}`});
    }
    //비번 암호화
    const hashed = await bcrypt.hash(password, bcryptSaltRounds)
    //계정 생성
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,email,url,
    })
   //토큰생성
    const token = createJwtToken(userId);
    //토큰 아이디 보내기
    res.status(201).json({token, username})
}

export async function login (req, res,next){
    const {username, password } = req.body;
    //해당 아이디 DB에 있음? //아이디에 매칭된 고유 아이디값가져오기
    const user = await userRepository.findByUsername(username);
    if(!user){
        res.status(401).json({message:`Invalid user! or password`});
    }
    //PW맞음?
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        res.status(401).json({messgae:'Invalid user or password'});
    }
    //고유 아이디값으로 토큰 생성
    const token = createJwtToken(user.id);
    //토큰과 아이디 보내기
    res.status(201).json({token, username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn:jwtExpiresInDays});
}

export async function me (req, res,next){
const user = await userRepository.findById(req.userId);//받아온 req에 userId가 우리 DB에 있나?
    if(!user){//DB에 없네!
        return res.status(404).json({message:'User not found'});
    }
    //위의 검증을 통과했군 = 있군 // 그럼 토큰값 다시 보내주고 유저이름도 보내주자
    res.status(200).json({token:req.token, username:user.username});
}

