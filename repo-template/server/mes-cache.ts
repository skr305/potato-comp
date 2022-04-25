const mesCache: {  [chatID: string]: { [userID: string] : string[] } } = {};
export const pushMes = ( chatID: string, userID: string, content: string ) => {
    if( mesCache[chatID] === undefined ) {
        mesCache[chatID] = {};
    }
    if( mesCache[chatID][userID] === undefined ) {
        mesCache[chatID][userID] = [];
    }
    console.log( chatID, userID, content );
    mesCache[chatID][userID].push( content );
} ;
export const getMesAndClear = ( chatID: string ,userID: string ):Array< string > => {
    if( mesCache[chatID] === undefined ) {
        mesCache[chatID] = {};
    }
    const res = mesCache[chatID][userID] ? mesCache[chatID][userID].concat( [] ) : []; 
    console.log( "inGet", res );
    // 一旦被接受 就清空
    mesCache[chatID][ userID ] = [];
    return res;
};