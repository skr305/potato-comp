import { Middleware } from 'koa';
import AppContext from '../app-context';
// raw logic 
// need to config
// for a pair
const resolveToken = (token: string): string => token;
export const EncryUserID = ( userID: string ): string => userID;

const koaAppToken = ():Middleware<any, AppContext> => {
    return async( ctx, next ) => {
        const token = ctx.request.body.headers.token;
        if( token ) {
            ctx.userID = resolveToken( token  );
        }
        await next();
    };
};
export default koaAppToken;