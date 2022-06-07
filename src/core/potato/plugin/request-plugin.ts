import { getStringWithFirstLower } from '../util';
import { PotatoPluginType } from '.';
import { getStandardComponentName } from '../util';
// such like AuthLogin
const RequestPluginGenerator
:( operationPrefix: string[] ) => PotatoPluginType 
= ( operationPrefix: string[] ) => ( defPRI, defSEC, defTPL ) => {
    return () => {
        defPRI( [ " import { post } from '../request'; " ] );
        operationPrefix.map( p => {
            p = getStringWithFirstLower( p );
            const apipath = `${ p }ApiPath`;
            defPRI( [ 
                `import { ${ p }Params } from '../api'`,
                `import { ${ p }Response } from '../api'`,
                `import { ${ apipath } } from '../api'`
            ] );
            defTPL( 
                `${p}Pured`, 
                ( args: string ) => {
                    const paramsString = args.trim();
                    const paramsTypeString =`${ p }Params`;
                    const reponseTypeString =`${ p }Response`;
                    return `post<${paramsTypeString}, ${reponseTypeString}>( { url: ${apipath}, payload: ${paramsString} } ).then( r => r.data )\n`
                },
                []
            );
        } );
    };
};
export default RequestPluginGenerator;