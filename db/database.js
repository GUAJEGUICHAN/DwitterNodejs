import { config } from '../config.js';
import SQ from 'sequelize';

const {host, user, database, password} = config.db;
export const sequelize = new SQ.Sequelize(database,user,password, 
    {host,
    dialect:'mysql',
    logging:false //더이상 데이터 베이스 실행한 것에 대해 로그가 남지 않는다.개발할때는 켜두다가 배포할 때 끄면 된다.
    } 
    )