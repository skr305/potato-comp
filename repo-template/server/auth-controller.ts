

import User from './entity/User.entity'; 
import dataSource from './data-source';
import AppContext from './app-context';
import { Next } from 'koa';
import GenID from './gen-id';
export default class AuthController {
    
public static async deleteUser ( ctx: AppContext, next: Next ) {
    
        await dataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        
.where("userID=:userID", {userID: ctx.json.userID})
        .execute();
        
ctx.body = { done: true };

    await next();
};
            
public static async insertUser ( ctx: AppContext, next: Next ) {
     { 
 const __inserting = new User ();
__inserting.userID = ctx.json.userID;
await dataSource.manager.insert( User, __inserting );
 
 } 
 
ctx.body = { done: true };

    await next();
};
            
};
        