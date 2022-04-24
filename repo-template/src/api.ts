
export type LoginParams = {userID: string, pwd: string};                
export type LoginResponse = {done: boolean};                
export const LoginApiPath = '/api/auth/login;'    
export type DeleteUserParams = {userID: string};                
export type DeleteUserResponse = {done: boolean};                
export const DeleteUserApiPath = '/api/auth/deleteuser;'    
export type InsertUserParams = {userID: string};                
export type InsertUserResponse = {done: boolean};                
export const InsertUserApiPath = '/api/auth/insertuser;'    