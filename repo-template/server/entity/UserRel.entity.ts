

import { Entity, Column, PrimaryColumn } from 'typeorm';
    


@Entity("UserRel")
export default class UserRel {
    
@PrimaryColumn()
mID: string
= "";

                    
@PrimaryColumn()
sID: string
= "";

                    
@PrimaryColumn()
rel: number
= 0;

                    
};            
            