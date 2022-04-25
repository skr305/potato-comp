
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
        
create table `UserRel` (
     
    mID varchar(300) not null DEFAULT '' 
    ,
      
    sID varchar(300) not null DEFAULT '' 
    ,
      
    rel int(20) not null DEFAULT 0 
    ,
     
    primary key (  mID,  sID, rel  ) 
    
);
        
create table `Mes` (
     
    id varchar(300) not null DEFAULT '' 
    ,
      
    senderID varchar(300) not null DEFAULT '' 
    ,
      
    chatID varchar(300) not null DEFAULT '' 
    ,
      
    content varchar(300) not null DEFAULT '' 
    ,
      
    date varchar(300) not null DEFAULT '' 
    ,
     
    primary key ( id  ) 
    
);
        