const INNER__MARK = "__";
// generate the standard bindingID
export const getBindingID = ( id0: string, id1: string  ) => {
    const [ smaller, bigger ] = id0 <= id1 ? [ id0, id1 ] : [ id1 , id0 ];
    return `${smaller}${INNER__MARK}${bigger}`;
};  
export const resolveBindingID = ( bindingID: string ) => {
    return bindingID.split( INNER__MARK );
};
