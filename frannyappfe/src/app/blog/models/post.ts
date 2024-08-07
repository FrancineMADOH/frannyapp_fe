export interface Post{
    post_id?:number ,
        title:string ,
        summary:string ,
        content:string ,
        author:number ,
        create_at:string  ,
        illustration:string ,
        slug:string,
        applause:number,
        category :string
        imgcredit:string
}

export interface PostResult extends Post{
    admin_name:string,
    twitter_url:string,
    facebook_url:string,
    linkedin_url:string,
    email:string
}