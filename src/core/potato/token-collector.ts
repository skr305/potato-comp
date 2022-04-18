import { XLS_ERROR_CODE_SET } from './../error/error-code';
import chalk from "chalk";
import BaseError from "../error/base-error";
import {  PotatoExposePRIToken, PotatoExposeSECToken, PotatoExposeTPLFunctionAlias, PotatoExposeTPLToken, PotatoTokenCollectorStoreType } from "./type";

const token:PotatoTokenCollectorStoreType = [];
const identifierMap = new Map<string, boolean>([]);
/** make the preIncludes can accepted by js/ts
 * compile the sugar
 */
const preIncludesFmt = ( pres: string[] ) => pres.map( p => {
    p = p.trim();
    // @/xxx = ../xxx = src/xxx
    if( p.slice( 0, 2 ) === "@/"  ) {
        return "../" + p.slice( 2 );
    }
    return p;
} );
export const getToken = () => token;
export const defPRI = ( 
    preIncludes: string[],
    effect ?: ( preIncludes: string[] ) => any 
) => {
    token.push( new PotatoExposePRIToken( preIncludesFmt( preIncludes ) ) );
    if( effect ) {
        effect( preIncludesFmt( preIncludes ) );
    }      
};
export const defSEC = ( 
    identifier: string,
    sec: string,
    preIncludes: string[],
    effect ?: ( id:string, sec: string, preIncludes: string[] ) => any 
) => {
    if( identifierMap.has( identifier ) ) {
        console.warn( chalk.bgYellow( chalk.redBright( `identifier repeat:${identifier}` ) ) );
        throw new BaseError( XLS_ERROR_CODE_SET.POTATO_VAR_IDENTIFIER_REPEAT, 'identifier repeat' );
    }
    identifierMap.set( identifier, true );
    token.push( new PotatoExposeSECToken( identifier, sec,  preIncludesFmt( preIncludes )  ) );
    if( effect ) {
        effect( identifier, sec,  preIncludesFmt( preIncludes )  );
    }      
};
export const defTPL = ( 
    identifier: string,
    tpl: PotatoExposeTPLFunctionAlias,
    preIncludes: string[],
    effect ?: ( id:string, tpl: PotatoExposeTPLFunctionAlias, preIncludes: string[] ) => any 
) => {
    if( identifierMap.has( identifier ) ) {
        console.warn( chalk.bgYellow( chalk.redBright( `identifier repeat:${identifier}` ) ) );
        throw new BaseError( XLS_ERROR_CODE_SET.POTATO_VAR_IDENTIFIER_REPEAT, 'identifier repeat' );
    }
    identifierMap.set( identifier, true );
    token.push( new PotatoExposeTPLToken( identifier, tpl,  preIncludesFmt( preIncludes ) ) );
    if( effect ) {
        effect( identifier, tpl,  preIncludesFmt( preIncludes ) );
    }      
};