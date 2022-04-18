export type PotatoExposeType = "PRI" | "SEC" | "TPL" | "NONE";
export type PotatoExposeTPLFunctionAlias = ( ...args: string[] ) => string;
export type PotatoTokenCollectorStoreType = PotatoExposeCompiledToken[];
export interface PotatoExposeCompiledToken {
    type: PotatoExposeType;
};
// the expose type need preInclude
export type PotatoExposeCommonTokenType = PotatoExposeCompiledToken & { preIncludes: string[]; };
export class PotatoExposePRIToken 
implements PotatoExposeCompiledToken {
    type: PotatoExposeType = "PRI";
    preIncludes: string[];
    constructor( preIncludes: string[] ) {
        this.preIncludes = preIncludes;
    };
};
export class PotatoExposeSECToken 
implements PotatoExposeCompiledToken {
    type: PotatoExposeType = "SEC";
    preIncludes: string[];
    // will be inserted
    sec: string;
    identifier: string;
    constructor( identifier: string, sec: string, preIncludes: string[] ) {
        this.identifier = identifier;
        this.preIncludes = preIncludes;
        this.sec = sec;
    };
};
export class PotatoExposeTPLToken 
implements PotatoExposeCompiledToken {
    type: PotatoExposeType = "TPL";
    preIncludes: string[];
    tpl: PotatoExposeTPLFunctionAlias;
    identifier: string;
    constructor( identifier: string, tpl: PotatoExposeTPLFunctionAlias, preIncludes: string[] ) {
        this.identifier = identifier;
        this.preIncludes = preIncludes;
        this.tpl = tpl
    };
};