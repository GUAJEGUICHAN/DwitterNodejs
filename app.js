import express from 'express';
import 'express-async-errors';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';

import testRouter from'./router/test.js'
import authRouter from'./router/auth.js'
import tweetsRouter  from './router/tweets.js'
import {config} from './config.js';
import { initSocket } from './connection/socket.js';
import {  sequelize } from './db/database.js';


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors( ));
app.use(morgan('tiny'));

app.use('/tweets',testRouter);

// app.get('/auth',(req, res,next)=>{    res.status(201).send('GET/ AUTH');})
app.use('/auth',authRouter);
//설마 이게 없어서 안됐나? 노놉
//이게 있으면 끝난다. 


app.use((req, res,next)=>{//위의 것들이 다거쳤는데 반환하는게 없다면 여기까지 온다..
    res.sendStatus(404);
})

app.use((error, req, res,next)=>{//위의 것들이 다거쳤는데 반환하는게 없다면 여기까지 온다..
    console.error(error);
    res.sendStatus(500);
})

//db.getConnection().then((connection)=> console.log(connection))
//DB와 연결해서 우리 모델과 스키마가 DB테이블로 존재하지 않는다면 Table을 새로 만들어준다. 
sequelize.sync().then(()=>{
    // console.log(client);
    //소켓을 사용하자
    const server = app.listen(config.host.port); //듣고있음을 표시하고 나머지는 밑에 모듈처리한다.
    //해당 주소를 듣고있다. express가 듣고있다. app.listen():http.server
    initSocket(server);//서버 선언/초기화한다. 
})







//소켓을
// socketIO.on('connection',(socket)=>{ //connection 이벤트 발생시 소켓을 받아온다.
//     console.log('Client is here!');
//     socketIO.emit('dwitter','Hello 🟢');//데이터를 전송한다.
//     socketIO.emit('dwitter','Hello 🟢');
// })

// setInterval(()=>{
//     socketIO.emit('dwitter','Hello1️⃣')
// },2000)

// app.listen(config.host.port





//원시 형태

// app.use('/tweetss',(req, res,next)=>{
//     res.send('HI');
// });

// app.route('/tweetsss').get('/',(req, res,next)=>{
//     res.status(201).send('GET /tweetsss');
// })

// app.get('/', (req,res,next)=>{
//     console.log("get");
//     res.send("으악 신세계");
// })

