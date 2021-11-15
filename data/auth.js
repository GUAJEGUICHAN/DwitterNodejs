// export function findById(id){
//     return tweets.find(t=>t.id===id);
// }
import SQ from 'sequelize'
import{ sequelize} from'../db/database.js';
const DataTypes = SQ.DataTypes;

//User를 연결시켜준다. 'user'를 정의한다. 
export const User = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true,
        },
        username:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING(128),
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING(128),
            allowNull:false,
        },email:{
            type:DataTypes.STRING(128),
            allowNull:false,
        },
        url:DataTypes.TEXT
},{timestamps:false}) 

export async function findByUsername(username){
    return User.findOne({where:{username}});
    // return users.find(user=>user.username===username);
//     return db.execute('SELECT * FROM users WHERE  username=?',[username])
//     .then(result=>result[0][0]);
}

export async function findById(id){
    return User.findByPk(id);
    // return users.find(user=>user.id===id);
    // return db.execute('SELECT * FROM users WHERE  id=?',[id])
    // .then(result=>result[0][0]);
    }

export async function createUser(newMember){
return User.create(newMember).then(data=>{console.log(data); return data})
    // const {username, password, name, email, url} = newMember;
    // return db.execute('INSERT INTO users (username, password, name, email, url) VALUES(?,?,?,?,?)',
    // [username, password, name, email, url]
    // ).then(result => {
    //     console.log(result);
    //     return result
    // });

}