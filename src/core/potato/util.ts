export const getStandardComponentName = ( comp:string ) => {
    return comp[0].toUpperCase() + comp.slice( 1 );
};
export const getStringWithFirstLower = ( comp: string ) => {
    return comp[0].toLowerCase() + comp.slice( 1 );
}
export const getRouterPathByPagename = ( pagename: string ) => {
    const INDEX_PATH_NAME = "index";
    const INDEX_ROUTER_PATH = "";
    return `/${ pagename === INDEX_PATH_NAME ? INDEX_ROUTER_PATH : pagename }`;
};