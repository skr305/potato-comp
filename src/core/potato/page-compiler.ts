import { StringGeneratorWithNoArgs } from './../../alias-type';
import BaseError from "../error/base-error";
import { stdWriteFileCover } from "../../util/std-write";
import { PotatoExposeCommonTokenType, PotatoExposeSECToken, PotatoExposeTPLToken, PotatoTokenCollectorStoreType } from "./type";
import { XLS_ERROR_CODE_SET } from "../error/error-code";

const logicReg = /<logic>([\s\S]*?)<\/logic>/ig;
const importReg = /<import>([\s\S]*?)<\/import>/ig;
const viewReg = /<view>([\s\S]*?)<\/view>/ig;
const viewPotatoFunctionReg = /<#>([\s\S]*?)<\/#>/ig;
const secReg = /#([_$A-Za-z]\w*)/g;
const tplReg = /#([_$A-Za-z]\w*)\s*\(([\s\S]*?)\)/g;
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
    // innerPlugins生成的逻辑
    // 会位于第一段logic段内
    rawPage =  `
    <logic>
    // innerPluginsGenerated
    /**************/
    ${ innerPlugins ? 
        innerPlugins
        .map( p => {
            return p();
        } )
        .join( "\n" )
        :""
    }
    </logic>
    `.concat( rawPage );

    // 生成import 逻辑
    // 会在preIncludes逻辑之后
    // 它可以在遵循顺序的情况下混写
    // import 和 常规js 语句
    let importSets = '';
    rawPage.replace( importReg ,( v, ...args ) => {
        importSets += args[0] + '\n';
        return '';
    } )
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
            .replace( tplReg, ( v, ...args: string[] ) => {
                const identifier = args[0];
                const exposeContent = getExposeContentOrThrow( identifier );
                if( exposeContent.type === "TPL" ) {
                    // console.log( ( exposeContent as PotatoExposeTPLToken ).tpl( ...tplInvokeArgs ) )
                    return ( exposeContent as PotatoExposeTPLToken ).tpl( args[1] );
                }   
                // ivk a sec is invalid
                throw new BaseError( XLS_ERROR_CODE_SET.POTATO_INVALID_INVOKE, `can-not-invoke-a-sec:${ lg[0] }, should-be-tpl ` );
        } );
    };

    /** compile view */
    let totalView = "";
    // the view string of potatoFunction will
    // be cached here
    let potatoFunctionGenedCache = '';
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
                potatoFunctionGenedCache += cp( compName )( props )( child );
            }
        }
    };

    {
        let currentViewer = '';
        for( let vi of rawPage.matchAll( viewReg ) ) {
            currentViewer = vi[1].replace( viewPotatoFunctionReg, ( v, ...args ) => {
                // clear the cache
                potatoFunctionGenedCache = '';
                // eval the nested: p("App")({ })();
                eval( args[0] );
                return potatoFunctionGenedCache;
            } ),
            
            totalView += currentViewer;
        }
    }
    // gen the preInclude 
    const logicPreIncludes:string = ( [ 
        ...( token as PotatoExposeCommonTokenType[] )
        .map( t => {
            // in the future, some extra expose type may not have
            // the property: preIncludes
            if( t.preIncludes !== undefined 
            || t.preIncludes !== null ) {
                return t.preIncludes.join( ";\n" );
            }
            return [];
        } )
    ] )
    .join("\n");    
    return `
<script setup lang="ts">
${ logicPreIncludes }
${ importSets }

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
