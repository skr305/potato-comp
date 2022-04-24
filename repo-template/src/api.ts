
export type deleteUserParams = {userID: string};                
export type deleteUserResponse = {done: boolean};                
export const deleteUserApiPath = '/api/auth/deleteuser';    
export type insertUserParams = {userID: string};                
export type insertUserResponse = {done: boolean};                
export const insertUserApiPath = '/api/auth/insertuser';    
export type loginParams = {userID: string, pwd: string};                
export type loginResponse = {done: boolean};                
export const loginApiPath = '/api/unauth/login';    
export type regParams = {userID: string, pwd: string, userNick: string};                
export type regResponse = {done: boolean};                
export const regApiPath = '/api/unauth/reg';    