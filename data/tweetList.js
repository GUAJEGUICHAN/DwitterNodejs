import * as userRepository from './auth.js'

let tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!',
        createdAt: new Date().toString(),
        userId: '1',
    },
    {
        id: '2',
        text: '안뇽!',
        createdAt: new Date().toString(),
        userId: '1',
    },
    ];
  
export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet) =>{
            const {username, name, url} = await userRepository.findById(
                tweet.userId
            );
            return{...tweet,username,name,url}
        })
    )
 }

export async function getAllByUsername(username){//username으로 트윗 가져오기 
    return getAll().then(tweets=>
        tweets.filter((tweet)=> tweet.username === username)
    )
}

export async function getById(id){//id로 트윗가져오기
    const found = tweets.find(tweet=>tweet.id === id)//id는 고유값이니 하나만 찾고 바로 나온다.
    if(!found){
        return null;
    }

    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username,name,url};//가져올 때 유져이름, 이름, url 모두 가져온다. 
}

export async function create(text,userId){//name과 username 필요없다. userId로 대체가능
    const tweet={
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    }
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}

export async function update(id, text){
    const tweet = tweets.find(t=>t.id===id);
    if(tweet){
        tweet.text=text;
    }
    return getById(tweet.id);;
}

export function remove(id){
    tweets = tweets.filter(t=>t.id!==id);
}

