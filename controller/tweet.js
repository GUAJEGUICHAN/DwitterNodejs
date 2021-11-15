import { getSocketIO } from '../connection/socket.js';
import * as tweetsRepository  from '../data/tweetList.js'

export async function getTweets (req, res,next){
    const username = req.query.username;    
    const data = await (username ? tweetsRepository.getAllByUsername(username) : tweetsRepository.getAll());
    res.status(200).send(data);
}

export async function getTweet(req, res,next){
    const id = req.params.id;
    const tweet = await tweetsRepository.getById(id) 
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({
            message:`Tweet id(${id})is not found`
        })
    }
}

export async function uploadTweet(req, res,next){
    const {text}  = req.body;
    const tweet = await tweetsRepository.create(text,req.userId)
    res.status(201).json(tweet)
    getSocketIO().emit('tweets', tweet)//tweet 이벤트 발생시 tweet을 전송
}

export async function updateTweet(req, res,next){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetsRepository.getById(id);
    if(!tweet){ // 찾는 트윗이 없네
        return res.sendStatus(404);
    }
    console.log(tweet);
    if(tweet.userId !== req.userId){ //수정자가 글쓴이가 아니네 
        return res.sendStatus(403);
    }
    const updated = await tweetsRepository.update(id,text)
    res.status(200).json(updated);
 
}

export async function removeTweet(req, res,next){
    const id = req.params.id;

    const tweet = await tweetsRepository.getById(id);
    if(!tweet){ // 찾는 트윗이 없네
        return res.sendStatus(404);
    }
    if(tweet.userId !== req.userId){ //수정자가 글쓴이가 아니네 
        return res.sendStatus(403);
    }

    tweetsRepository.remove(id);
    res.sendStatus(204);

}