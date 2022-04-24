
drop database if exists `123-b`;
create database `123-b`;
use `123-b`;
    
create table `User` (
     
    userID varchar(300) not null DEFAULT '' 
    ,
      
    pwd varchar(300) not null DEFAULT '' 
    ,
      
    userNick varchar(300) not null DEFAULT '' 
    ,
     
    primary key ( userID  ) 
    
);
        