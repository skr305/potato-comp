
import KoaRouter from '@koa/router';
import AuthController from '../auth-controller';
import UnauthController from '../unauth-controller';
import koaAppToken from '../middlewares/app-token';

const authRouter = new KoaRouter();
authRouter.use( koaAppToken );
const unauthRouter = new KoaRouter();
    
authRouter.post( '/deleteUser', AuthController.deleteUser ); 
            
authRouter.post( '/insertUser', AuthController.insertUser ); 
            
unauthRouter.post( '/login', UnauthController.login ); 
            
unauthRouter.post( '/reg', UnauthController.reg ); 
            
const router = new KoaRouter();
router.use( "/auth", authRouter.routes() );
router.use( "/unauth", unauthRouter.routes() );
const apiRoutes = router.routes();
export default apiRoutes;
    