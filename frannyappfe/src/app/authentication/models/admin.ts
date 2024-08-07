export interface Admin {
    admin_id?:number,
    admin_name:string ,
    username:string ,                               
    twitter_url:string,                    
    linkedin_url:string,  
    facebook_url:string,               
    email:string,                 
    admin_password?:string,               
   // avatar:string //{data:Buffer,contentType:string }  
    activ_date:string,              
    superuser?:boolean
}


