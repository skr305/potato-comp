const reg = /#([_$A-Za-z]\w*)\s*\(([\s\S]*)\)/g
// console.log( "#loginPured  ( 2333, { usename: 233, ewwqe: 23 }, weqwe )".matchAll( reg ) );
"#loginPured  ( eqeq, { usename: 233, ewwqe: 23 }, weqwe )".replace( reg, ( v, ...args ) => {
    console.log( args[1] );
} );

const obj = { dog: 233 };
const { dog : bigDog } = obj;
console.log( "--------------" )
console.log( Array.from( "#loginPured  ( 2333, { usename: 233, ewwqe: 23 }, weqwe )".matchAll( reg ) ) );
