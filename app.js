import express from 'express';
import 'express-async-errors';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';

import testRouter from'./router/test.js'
import authRouter from'./router/auth.js'
import tweetsRouter  from './router/tweets.js'
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

app.listen(8080)







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

