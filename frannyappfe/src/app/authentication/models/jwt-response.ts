export interface JwtResponse {
    admin:{
        id: number,
        username:string ,                                            
        email:string, 
        access_token:string,
        expires_in: number  
    }
   
                 
    
}
