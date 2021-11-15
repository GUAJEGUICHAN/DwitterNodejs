import {  sequelize } from '../db/database.js';
import * as userRepository from './auth.js'
import SQ from'sequelize';
import {User} from './auth.js'
import { Result } from 'express-validator';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Tweet = sequelize.define('tweet',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})

Tweet.belongsTo(User);//이렇게 하면 알아서 외부키 만들어준다. 

const INCLUDE_USER={
    attributes:[
        'id','text','createdAt','userId',
        [Sequelize.col('user.name'),'name'],
        [Sequelize.col('user.username'),'username'],
        [Sequelize.col('user.url'),'url']],
    include:{
        model:User,//데이터 가져올때 해당 User의 모델 값도 가져온다. 그대신 중첩된 값이 나올 것이다. 
        attributes:[]//먼저 Attribute를 비울 것이다. 
    }
}

const ORDER_DESC = {
    order:[['createdAt','DESC']],
}

export async function getAll(){
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC
    })
    //return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then(result=>result[0]);
    //ON tw.userId=us.id 일경우 = tweetd의 userID와 users의 id가 같은 인스턴스만 가져온다는 것이다. 
    //우리가 시간 최신순으로 봐야하기 때문에 ODER BY tw.createdAt DESC로 시간 내림차순 적용
 }


export async function getAllByUsername(username){//username으로 트윗 가져오기 
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC,include:{
        ...INCLUDE_USER.include,
        where:{username},
    }})
}

export async function getById(id){//id로 트윗가져오기
    return Tweet.findOne({ ...INCLUDE_USER,where:{id},
   })

    }

export async function create(text,userId){//name과 username 필요없다. userId로 대체가능
    return Tweet.create({text, userId})
    .then(data=>{this.getById(data.getDataValue('id'));
})
// return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)',[text,new Date(),userId])
    // .then(result=>getById(result[0].insertId))//새로운 트윗을 넣어줬으면 넣어진 트윗들을 다시 받아서 출력해야한다.
    // const tweet={
    //     id: Date.now().toString(),
    //     text,
    //     createdAt: new Date(),
    //     userId
    // }
    // tweets = [tweet, ...tweets];
    // return getById(tweet.id);

}



export async function update(id, text){

    return Tweet.findByPk(id, INCLUDE_USER)
    .then(tweet=>{
        tweet.text = text;
        return tweet.save();
    })
}
    // return db.execute('UPDATE tweets SET text=? WHERE id=?',[text, id]).then(()=>getById(id));
    // const tweet = tweets.find(t=>t.id===id);
    // if(tweet){
    //     tweet.text=text;
    // }
    // return getById(tweet.id);;
export async function remove(id){
return Tweet.findByPk(id)
    .then((tweet)=>{
        tweet.destroy();
    })
}

    // return db.execute('DELETE FROM tweets WHERE id=?',[id])
    // tweets = tweets.filter(t=>t.id!==id);

