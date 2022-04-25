import { ServerErroCodeMap } from './../error-code';
import { Middleware } from 'koa';
import AppContext from '../app-context';
import ServerError from '../server-error';
// raw logic 
// need to config
// for a pair
const resolveToken = (token: string): string => token;
export const EncryUserID = ( userID: string ): string => userID;

const koaAppToken = ():Middleware<any, any> => {
    return async( ctx, next ) => {
        const token = ctx.request.body.headers.token;
        if( token ) {
            ctx.userID = resolveToken( token  );
        } else {
            throw new ServerError( "unauthonrized", ServerErroCodeMap.UNAUTH );
        }
        await next();
    };
};
export default koaAppToken;