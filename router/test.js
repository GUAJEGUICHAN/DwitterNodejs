import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js'
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();
const validateTweet = [
    body('text')
    .trim()
    .isLength({min : 3})
    .withMessage('text should be at least 3'),
    validate,
]

// GET /tweets
// GET /tweets?username=:username
router.get('/',isAuth,tweetController.getTweets)

// GET /tweets/:id
router.get('/:id',isAuth,tweetController.getTweet)

// POST /tweeets
router.post('/',isAuth,validateTweet, tweetController.uploadTweet)

//PUT /tweets/:id
router.put('/:id',isAuth,validateTweet, tweetController.updateTweet)

//DELETE /tweets/Lid
router.delete('/:id',isAuth,tweetController.removeTweet)

export default router