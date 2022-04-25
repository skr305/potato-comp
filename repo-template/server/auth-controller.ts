

import User from './entity/User.entity'; 
import UserRel from './entity/UserRel.entity'; 
import Mes from './entity/Mes.entity'; 
import dataSource from './data-source';
import AppContext from './app-context';
import { Next } from 'koa';
import GenID from './gen-id';
export default class AuthController {
    
public static async getSess ( ctx: AppContext, next: Next ) {
    let cRels = await dataSource.manager.find( UserRel, { where: { mID: ctx.userID, rel: 1,  }, order: {  }  } );
const { getBindingID } = ( await import('./binding-id') );
const result = cRels.map( ( r:UserRel ) => { return { id: getBindingID( ctx.userID, r.sID ), title: getBindingID( ctx.userID, r.sID ) }  } )
ctx.body = result

    await next();
};
            
public static async creSes ( ctx: AppContext, next: Next ) {
    const toID = ctx.json.toID
let toUser = await dataSource.manager.find( User, { where: { userID: toID,  }, order: {  }  } );
if( !toUser ) { ctx.body = { done: false, chatID: '' } }
else {
 { 
 const __inserting = new UserRel ();
__inserting.mID = ctx.userID;
__inserting.sID = toID;
__inserting.rel = 1;
await dataSource.manager.insert( UserRel, __inserting );
 
 } 
 
const chatID = ( await import('./binding-id') ).getBindingID( toID, ctx.userID );
ctx.body = { done: true, chatID }
}

    await next();
};
            
public static async getMes ( ctx: AppContext, next: Next ) {
    const { chatID } = ctx.json
let allMes = await dataSource.manager.find( Mes, { where: { chatID: chatID,  }, order: { date: 'asc',  }  } );
const res = allMes.map( m => { const isMe = ctx.userID === m.senderID; return { content: m.content, isMe } } )
ctx.body = res

    await next();
};
            
public static async sendMes ( ctx: AppContext, next: Next ) {
    const { chatID, message:content,date } = ctx.json
const { pushMes } = await ( import('./mes-cache') );
const { resolveBindingID } = await( import('./binding-id') );
const pairIDs = resolveBindingID( chatID )
const toID = pairIDs[0] === ctx.userID ? pairIDs[1] : pairIDs[0]
pushMes( chatID, toID, content )
 { 
 const __inserting = new Mes ();
__inserting.chatID = chatID;
__inserting.date = date;
__inserting.content = content;
__inserting.id = GenID('mes');
__inserting.senderID = ctx.userID;
await dataSource.manager.insert( Mes, __inserting );
 
 } 
 
ctx.body = { done: true }

    await next();
};
            
public static async recvMes ( ctx: AppContext, next: Next ) {
    const { chatID } = ctx.json
const { getMesAndClear } = await ( import('./mes-cache') )
ctx.body = getMesAndClear( chatID, ctx.userID ).map( m => { return { isMe: false, content: m } } )

    await next();
};
            
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
        