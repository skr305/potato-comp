import { StringGeneratorWithNoArgs } from './../../../alias-type';
import { defTPL, defPRI } from './../token-collector';
import { PotatoPluginType } from ".";
import { getStandardComponentName, getRouterPathByPagename } from '../util';

const routerPlugin:PotatoPluginType = ( defPRI, defSEC, defTPL ) => {
    return () => {
        defPRI( [`
        import { useRouter, useRoute } from 'vue-router';
        `] );  
    }
};
export const routerInnerPlugin = ( purePagenames: string[] ):StringGeneratorWithNoArgs => {
    return () => {
return `
const __router = useRouter();
const __pushR = ( routername: string ) => __router.push( routername );
const __replaceR = ( routername: string ) => __router.replace( { path: routername } ); 
${  
    purePagenames
    .map( p => {
        return `
const __${ getStandardComponentName( p ) }Path = "${ getRouterPathByPagename( p ) }"`;
    } )
    .join( '' )
}
`;
    }
}
export default routerPlugin;