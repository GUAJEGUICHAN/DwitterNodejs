import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js'
import {config }from'../config.js';



const AUTH_ERROR = {message : 'Authentication Error'};

export const isAuth=async (req, res,next)=>{
    const authHeader = req.get('Authorization');//헤더에 Authorization이 있어? 있음 가져와
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];//가져온 Authorization의 값에서 토큰 가져와
    
    //Make it Secure!
    //이게 맞는 토큰인지 검증하자
    jwt.verify(
        token,config.jwt.secretKey,
        async (error,decoded)=>{
            //검증동안 에러 발생시
            if(error){ 
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            
            //해독이 되어서 사용자 키가 판별이 된다면  req 자체에 userId를 추가한다.
            req.userId = user.id; //  req.customData;
            next()

        }
    )


}