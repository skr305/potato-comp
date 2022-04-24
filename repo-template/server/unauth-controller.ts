

import User from './entity/User.entity'; 
import dataSource from './data-source';
import AppContext from './app-context';
import { Next } from 'koa';
import GenID from './gen-id';
export default class UnauthController {
    
public static async login ( ctx: AppContext, next: Next ) {
    let user = await dataSource.manager.findOne( User, { where: { userID: ctx.json.userID,  } } );
ctx.body = { done: user && user.pwd === ctx.json.pwd };

    await next();
};
            
public static async reg ( ctx: AppContext, next: Next ) {
    let user = await dataSource.manager.findOne( User, { where: { userID: ctx.json.userID,  } } );
if( !user )
 { 
 const __inserting = new User ();
__inserting.userID = ctx.json.userID;
__inserting.userNick = ctx.json.userNick;
__inserting.pwd = ctx.json.pwd;
await dataSource.manager.insert( User, __inserting );
ctx.body = { done: true };
 } 
 
else 
ctx.body = { done: false };

    await next();
};
            
};
        