let users=[
{id:'1',
username:'bob',
password:"1111",
name:'Bob',
email:'bob@gmail.com',
url:'',},
];



// export function findById(id){
//     return tweets.find(t=>t.id===id);
// }


export async function findByUsername(username){
    return users.find(user=>user.username===username);

}

export async function findById(id){
    return users.find(user=>user.id===id);
}

export async function createUser(newMember){
    const created = {...newMember, id:Date.now().toString()};
    users.push(created);
    return created.id;
}