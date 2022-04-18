import { PureFunctionWithNoArgs } from "../../../alias-type";

// 插件生成器
export type PotatoPluginType = (
    defPRI: ( 
        preIncludes: string[],
        effect ?: ( preIncludes: string[] ) => any 
    ) => any,
    defSEC: ( 
        identifier: string,
        sec: string,
        preIncludes: string[],
        effect ?: ( id:string, sec: string, preIncludes: string[] ) => any 
    ) => any,
    defTPL: ( 
        identifier: string,
        tpl: PotatoExposeTPLFunctionAlias,
        preIncludes: string[],
        effect ?: ( id:string, tpl: PotatoExposeTPLFunctionAlias, preIncludes: string[] ) => any 
    ) => any,
) => PureFunctionWithNoArgs;