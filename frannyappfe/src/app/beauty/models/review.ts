export interface Review {
        review_id?:number ,
        rdvid: number,  
        user_id: string,           
        done_by:number ,                  
        review_date:string ,               
        note: number,                      
        comment: string 
        //extends
        
}

export interface ReviewExtension extends Review {
        bname:string,
        client_name:string,
        rdvcode:string
}