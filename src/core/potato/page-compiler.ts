import { StringGeneratorWithNoArgs } from './../../alias-type';
import BaseError from "../error/base-error";
import { stdWriteFileCover } from "../../util/std-write";
import { PotatoExposeCommonTokenType, PotatoExposeSECToken, PotatoExposeTPLToken, PotatoTokenCollectorStoreType } from "./type";
import { XLS_ERROR_CODE_SET } from "core/error/error-code";

const logicReg = /<logic>([\s\S]*?)<\/logic>/ig;
const viewReg = /<view>([\s\S]*?)<\/view>/ig;
const secReg = /#([_$A-Za-z]\w*)/g;
const tplReg = /#([_$A-Za-z]\w*)\s*[(](\s*(\S+?)\s*,)*(\s(\S+?)\s)[)]/g;
const getPageStringWithToken = ( 
    rawPage: string, 
    token: PotatoTokenCollectorStoreType, 
    innerPlugins ?: StringGeneratorWithNoArgs[] 
): string => {
    /**
     * raw be like
     * 
     * <logic>
     * </logic>
     * 
     * include the template
     * replace the #identifier to the sec
     * or ivk the tpl
     * 
     * if the identifier exists on tpl and sec in one time
     * it should be recongnized as a tpl
     * 
     * <view>
     * </view>
     * 
     * 
     */


    /** compile logic */
    let totalLogic = "";
    const getExposeContentOrThrow = ( identifier: string ): PotatoExposeSECToken | PotatoExposeTPLToken => {
        let exposeContent: PotatoExposeSECToken | PotatoExposeTPLToken | null = null;
        token.every( ( expose ) => {
            if( expose.type === "SEC" ) {
                if( ( expose as PotatoExposeSECToken ).identifier === identifier ) {
                    exposeContent = ( expose as PotatoExposeSECToken );
                    return false;
                } 
            } else if( expose.type === "TPL" ) {
                if( ( expose as PotatoExposeTPLToken ).identifier === identifier ) {
                    exposeContent = ( expose as PotatoExposeTPLToken );
                    return false;
                } 
            }
            return true;
        } );
        if( !exposeContent ) {
            throw new BaseError( XLS_ERROR_CODE_SET.POTATO_VAR_NOT_FOUND, 
                " error-identifier-notfound " + 
            "#" + identifier );
        }
        return exposeContent;
    };  
    // 先对 <logic></logic> 内的内容进行一个提取
    // 并且在提取的过程中对变量进行一个转化
    // 且批量记录所有logic内容
    for( let lg of rawPage.matchAll( logicReg ) ) {        
        totalLogic += 
        // lg[1] is the content nested in <logic></logic>
            lg[1]
            .replace( secReg, ( v, ...args ) => {
                const identifier = args[0];
                const exposeContent = getExposeContentOrThrow( identifier );
                if( exposeContent.type === "SEC" ) {
                    return ( exposeContent as PotatoExposeSECToken ).sec;
                }
                // tpl don't need to be replaced in first stage
                return v;
            } )
            .replace( tplReg, ( v, ...args ) => {
                const identifier = args[0];
                const exposeContent = getExposeContentOrThrow( identifier );
                if( exposeContent.type === "TPL" ) {
                    // get the tplInvokeArgs
                    const tplInvokeArgs = [];
                    // remove the idx and origin 
                    for( let i=2; i<args.length-2; i+=2 ) {
                        tplInvokeArgs.push( args[i] );
                    }
                    return ( exposeContent as PotatoExposeTPLToken ).tpl( ...tplInvokeArgs );
                }   
                // ivk a sec is invalid
                throw new BaseError( XLS_ERROR_CODE_SET.POTATO_INVALID_INVOKE, `can-not-invoke-a-sec:${ lg[0] }, should-be-tpl ` );
        } );
    };

    /** compile view */
    let totalView = "";

    // util function
    const cp  = ( compName: string ) => {
        return ( props ?: { [ key: string ]: string } ) => {
            return ( child ?: string ) => {
                const propsNested = (() => {
                    if( props ) {
                        return Object
                        .keys( props )
                        .map( k => {
                            // need to be bound
                            if( k[0] === "$" ) {
                                return ` ${k.slice( 1 )} := "${ props[k] }" `
                            } else {
                                return ` ${ k } = "${ props[k] }"  `
                            }
                        } )
                        .join( " " );
                    }
                    return "";
                })();
                return `
<${compName} ${ propsNested }> ${ child || "" } </${compName}> `;
            };
        };
    };
    const p = ( compName: string ) => {
        return ( props ?: { [ key: string ]: string } ) => {
            return ( child ?: string ) => {
                totalView += cp( compName )( props )( child );
            }
        }
    };
    for( let vi of rawPage.matchAll( viewReg ) ) {
        // eval the nested: p("App")({ })();
        eval( vi[1] );
    }
    // gen the preInclude 
    const logicPreIncludes:string = ( [ 
        ...( token as PotatoExposeCommonTokenType[] )
        .map( t => {
            // in the future, some extra expose type may not have
            // the property: preIncludes
            if( t.preIncludes !== undefined 
            || t.preIncludes !== null ) {
                return t.preIncludes;
            }
            return [];
        } ) 
    ] )
    .join("\n");    
    return `
<script setup lang="ts">
${ logicPreIncludes }
${ innerPlugins ? 
    innerPlugins
    .map( p => {
        return p();
    } )
    .join( "\n" )
    :""
}
${totalLogic}
</script>
<template>
${totalView}
</template>
    `;
};
const writeToPage = async ( 
    outputPath: string, 
    rawPage: string, 
    token: PotatoTokenCollectorStoreType,
    innerPlugins ?: StringGeneratorWithNoArgs[] 
) => {
    await stdWriteFileCover( outputPath, getPageStringWithToken( rawPage, token, innerPlugins ) );
};
export default writeToPage;
