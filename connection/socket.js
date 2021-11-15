import { Server } from "socket.io";
import jwt  from "jsonwebtoken";
import { config } from "../config.js";

class Socket{
    constructor(server){//소켓 클래스를 만들면 바로 이렇게 서버를 만든다. 
        this.io = new Server(server ,{//그냥연결하면 cors policy을 위반한다.
            cors:{//cors에 모든 값을 허용하는 옵션을 추가로 넣으면 정상작동한다.
                origin:'*',
            },
        })

        this.io.use((socket, next)=>{//통신하기 직전에 토큰을 검증한다.//:Socket
            const token = socket.handshake.auth.token; 
            if(!token){
                return next(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secretKey,(error,decoded)=>{
                if(error){
                    return next(new Error('Authentication Error'))
                }
                next();
            })
        });

        this.io.on('connection', (socket)=>{ //connectoin 이벤트 발생시 다음 콜백함수 진행
            console.log('Socket client connected')
        })
        
    }
}

let socket;

export function initSocket(server){
    if(!socket){
        socket = new Socket(server);//자신의 클래스로생소켓 생성, 초기화
    }
}

export function getSocketIO(){
    if(!socket){
        throw new Error('please call init first');
    }
    return socket.io//서버이다. :Socket
}