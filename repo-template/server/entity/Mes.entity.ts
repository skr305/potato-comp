

import { Entity, Column, PrimaryColumn } from 'typeorm';
    


@Entity("Mes")
export default class Mes {
    
@PrimaryColumn()
id: string
= "";


@Column()
senderID: string
= "";

                    
@Column()
chatID: string
= "";

                    
@Column()
content: string
= "";

                    
@Column()
date: string
= "";

                    
};            
            