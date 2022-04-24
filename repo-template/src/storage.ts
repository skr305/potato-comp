export const setStorage =  <T extends Object>( storage: Storage, in_sec:string, data: T ) => {
    storage.setItem(in_sec, JSON.stringify(data));
}
export const getStorage = <T extends Object>( storage: Storage ,sec: string ):T | null => {
    const entityStringfy = storage.getItem(sec);
    if(entityStringfy) {
        return JSON.parse( entityStringfy );
    }
    return null;
}

export const setLocal = <T extends Object>(in_sec:string, data: T) => {
    setStorage( localStorage, in_sec, data );
}
export const getLocal = <T extends Object>(sec: string):T | null => {
    return getStorage( localStorage, sec );
}

export const setSession = <T extends Object>(in_sec:string, data: T) => {
    setStorage( sessionStorage, in_sec, data );
}
export const getSession = <T extends Object>(sec: string):T | null => {
    return getStorage( sessionStorage, sec );
}