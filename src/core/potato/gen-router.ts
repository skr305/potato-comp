import { stdWriteFileCover } from "../../util/std-write";
import { getStandardComponentName } from "./util";


const getRouterStringFromPages = ( purePages: string[] ): string => {
    
    const INDEX_PATH_NAME = "index";
    const INDEX_ROUTER_PATH = "";
    return `
${ 
    purePages
    .map( p => {
        return `import ${ getStandardComponentName( p ) } from './pages/${p}.vue'`;
    } ) 
    .join( '\n' )
}
const routes = [
${
    purePages
    .map( p => {
        return `
    { 
        path: '/${ p === INDEX_PATH_NAME ? INDEX_ROUTER_PATH : p }', 
        component: ${ getStandardComponentName( p ) } 
    }, `

    } ) 
    .join( '' )
}
];
export default routes;
    `;
};
const writeRouterToPaths = async ( outputPath: string, purePages: string[] ) => {
    await stdWriteFileCover( outputPath, getRouterStringFromPages( purePages ) );
};
export default writeRouterToPaths;