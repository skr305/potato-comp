"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot = function (oper) {
    var result = "\nimport KoaRouter from '@koa/router';\nimport AuthController from '../auth-controller';\nimport UnauthController from '../unauth-controller';\nimport koaAppToken from '../middlewares/app-token';\n\nconst authRouter = new KoaRouter();\nauthRouter.use( koaAppToken );\nconst unauthRouter = new KoaRouter();\n    ";
    ["Auth", "Unauth"].map(function (fp) {
        if (!oper.Api[fp]) {
            return;
        }
        Object.keys(oper.Api[fp]).map(function (cp) {
            result += "\n".concat(fp.toLowerCase(), "Router.post( '/").concat(cp, "', ").concat(fp, "Controller.").concat(cp, " ); \n            ");
        });
    });
    result += "\nconst router = new KoaRouter();\nrouter.use( \"/auth\", authRouter.routes() );\nrouter.use( \"/unauth\", unauthRouter.routes() );\nconst apiRoutes = router.routes();\nexport default apiRoutes;\n    ";
    return result;
};
exports.default = boot;
