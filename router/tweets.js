import express from 'express';
import 'express-async-errors';

const router = express.Router();

export default router;
// let tweets=[
//     {
//         id:'1',
//         text:'드림코더 화이팅팅',
//         createdAt:new Date(),
//         name:'Bob',
//         username:'bob',
//         url:'/'
//     },
//     {
//         id:'2',
//         text:'취업하지 않을래?',
//         createdAt: new Date(),
//         name:'Timothy',
//         username:'Timothy',
//         url:'/'
//     }
// ]

// router.get('/',(req, res,next)=>{
//     const username =req.query.username;
//     const data = username?tweets.filter(t=>t.username === username):tweets
//     res.status(200).send(data);
// })

// router.get('/:id',(req, res,next)=>{
//     const id = req.params.id;
//     const tweet = tweets.find(t=>t.id===id);
//     if(tweet){
//         res.status().json(tweet);
//     }else{
//         res.status(404).json({
//             message:`Tweet id(${id})is not found`
//         })
//     }

// })

// router.post('/',(req, res,next)=>{
//     const {text, name, username} = req.body;
//     const tweet={
//         id:Date.now().toString(),
//         text,
//         createdAt: new Date(),
//         name,
//         username,
//     }
//     tweets = [tweet, ...tweets];
//     res.status(201).json(tweet)
// })

// router.put('/:id',(req, res,next)=>{
//     const id = req.params.id;
//     const text = req.body.text;
//     const tweet = tweets.find(t=>t.id===id);
//     if(tweet){
//         tweet.text=text;
//         res.status(200).json(tweet)
//     }else{
//         res.status(404).json({
//             message:'Tweet id(${id}) is not found '
//         })
//     }
// })

// router.delete('/:id',(req, res,next)=>{
//     const id = req.params.id;
//     tweets = tweets.filter(t=>t.id!==id);
//     res.sendStatus(204);

// })

