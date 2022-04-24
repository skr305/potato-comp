import { getStringWithFirstLower } from './../util';
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
            const apipath = `${ getStandardComponentName( p ) }ApiPath`;
            defPRI( [ 
                `import { ${ getStandardComponentName( p ) }Params } from '../api'`,
                `import { ${ getStandardComponentName( p ) }Response } from '../api'`,
                `import { ${ apipath } } from '../api'`
            ] );
            defTPL( 
                `${p}Pured`, 
                ( args: string ) => {
                    const paramsString = args.trim();
                    const paramsTypeString =`${ getStandardComponentName( p ) }Params`;
                    const reponseTypeString =`${ getStandardComponentName( p ) }Response`;
                    return `post<${paramsTypeString}, ${reponseTypeString}>( { url: ${apipath}, payload: ${paramsString} } ).then( r => r.data );\n`
                },
                []
            );
        } );
    };
};
export default RequestPluginGenerator;