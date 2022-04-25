import { ErrorMapBlock } from '../type';

const drawErrorMapToEnum = ( errorMap: ErrorMapBlock, appName: string = "App" ) => {
    // 被嵌入到enum的内容
    let nested = "";
    Object.keys( errorMap ).map( ( errorMean, idx, arr ) => {
        nested += `${errorMean} = ${errorMap[errorMean]}`
        // it isn't the last
        if( idx !== arr.length - 1 ) {
            nested += ",\n"
        } else {
            nested += "\n"
        }
    } );
    return `
export enum ServerErrorCode {
    ${ nested }
};
    `;
};
/**
 * 
 * @param errorMap the errormap in config
 * @param appName app's name, to gened the var-name
 */
const drawErrorCodeMap = (  errorMap: ErrorMapBlock, appName: string = "App"  ): string => {
    return `
export const ServerErroCodeMap = ${ JSON.stringify( errorMap ) };\n
    `;
};
/**
 * 
 * @param errorMap the errormap in config
 * @returns gened file that be stringfy
 */
const boot = ( errorMap: ErrorMapBlock, appName: string = "App" ):string => {
    
    const DEFAULT_UNKNOWN_ERROR_TAG = "UNKNOWN";
    const DEFAULT_OK_ERROR_TAG = "OK";
    const DEFAULT_NOT_FOUND_TAG = "NOT_FOUND";
    const DEFAULT_UNAUTH = "UNAUTH";

    // 必须有一个默认为Unknown的不可处理错误
    if( errorMap[ DEFAULT_UNKNOWN_ERROR_TAG ] === undefined ) {
        errorMap[ DEFAULT_UNKNOWN_ERROR_TAG ] = 999;
    }
    // 必须有一个默认为Unknown的不可处理错误
    if( errorMap[ DEFAULT_NOT_FOUND_TAG ] === undefined ) {
        errorMap[ DEFAULT_NOT_FOUND_TAG ] = 998;
    }
    // 必须有一个默认的OK错误
    if( errorMap[ DEFAULT_OK_ERROR_TAG ] === undefined ) {
        errorMap[ DEFAULT_OK_ERROR_TAG ] = 0;
    } 

    if( errorMap[ DEFAULT_UNAUTH ] === undefined ) {
        errorMap[ DEFAULT_UNAUTH ] = 997;
    }
    let result = `
${ drawErrorMapToEnum( errorMap, appName ) }
${ drawErrorCodeMap( errorMap, appName ) }    
    `;
    return result;
};
export default boot;