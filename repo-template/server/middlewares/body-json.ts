import AppContext from '../app-context';
import { Next, Middleware } from 'koa';
import koaCompose from 'koa-compose';
import koaBody from 'koa-body'
const koaJson = (): Middleware<any, AppContext> => {
    return async ( ctx, next: Next ) => {
        // json is a alias of body.data
        ctx.json = ctx.request.body.data || {};
        await next();
    }
};
const koaBodyJson = koaCompose( [ koaBody(),koaJson() ] );
export default koaBodyJson;