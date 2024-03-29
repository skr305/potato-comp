import { DataSource } from "typeorm";
import chalk from 'chalk';
import { BaseName, BaseUser, BasePwd, Cover } from './data-source-option';



const dataSource = new DataSource( {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": BaseUser,
    "password": BasePwd,
    "database": BaseName,
    "entities": [ __dirname + "\\entity\\*.entity.js" ],
    "cache": false,
    // here init will be false
    "synchronize": false
} );
export default dataSource;
// init the typeorm
export const initDataSource = async() => {
    let isBaseExist = false;
    
    /** 用于进行Cover实现 不包含表生成 暂时弃用  */
    // try {
    //     // 用来查看该数据库是否存在
    //     const queier = new DataSource( { 
    //         "type": "mysql",
    //         "host": "localhost",
    //         "port": 3306,
    //         "username": BaseUser,
    //         "password": BasePwd 
    //     } );
    //     await queier.initialize();
    //     if( Cover ) {
    //         await queier.query( `DROP DATABASE IF EXISTS \`${BaseName}\`` )
    //     }
    //      // 如果该数据库没有被创建 则应该被重新创建
    //     // 如果被创建了 是否从新重现视Cover而定
    //     isBaseExist = ( await queier.query( `SHOW DATABASES LIKE \"${BaseName}\"` ) as Array<any> ).length !== 0;
    //     // 不存在则新建 
        
    //     /** 可以利用dataSource.initialize的能力新建 */
    //     if( !isBaseExist ) {
    //         await queier.query( `CREATE DATABASE \`${BaseName}\`` );
    //     }
    //     await queier.destroy();
    // } catch ( error ) {
    //     console.error( error );
    //     console.error( "please check out the mysql service" );
    //     console.error( "connection fail when init" );
    // }
    /** */
    
    try {
        // await dataSource.driver.connect();
        await dataSource.initialize();
    } catch ( error ) {
        console.error( error );
        console.log( chalk.greenBright( "database connetion failed" ) );
    }
};