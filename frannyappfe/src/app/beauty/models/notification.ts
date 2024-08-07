export interface Notification{
    
    notif_id?:number ,
    date_created?:Date ,
    date_resolved?:Date ,
    notif_state?:string ,
    client_number:string ,
    comment?:string
}