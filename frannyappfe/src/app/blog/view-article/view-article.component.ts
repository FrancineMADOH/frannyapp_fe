import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Post, PostResult } from '../models/post';
import { BlogService } from '../services/blog.service';
import { Comment } from '../models/comment';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { environment } from 'src/app/environment/env';


@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  id!:string;
  post!: any;
  comment!:any;
  commentsubmit!:boolean;
  succesMessage = "";
  comment_class="";
  number_of_comments!:number;
  commentList:Comment[]= [];
  isAdmin!:boolean;
  loading = true;
  AllPost:Post[] =[];
  allLikes:any = []
  feminityPosts:Post[] = [];
  maternityPosts:Post[] = [];
  familyPosts:Post[] = [];
  blog_post_id!:number;
  html!:any; 
  like!:any;
  mysubscription:any;
  hasliked = 'test'
  env = environment.env

  user_has_liked!:boolean;

  @ViewChild("commentForm",{static:true}) commentForm:any;
  @ViewChild("likeForm", {static:true}) likeForm:any;

  constructor(public blog:BlogService, 
    private auth:AuthService,
    private router:Router,
    private sanitized:DomSanitizer, 
    private route:ActivatedRoute){
      
    }

  ngOnInit(): void {

  setTimeout(() => {
      this.loading = false;
      
  }, 1000);
  this.isAdmin= this.auth.isLogin();
  this.commentsubmit = false;
  this.id = this.route.snapshot.params['id'];
  
    this.blog.viewPost(Number(this.id)).subscribe((data)=>{
      this.post = data.post;
      this.html = this.sanitized.bypassSecurityTrustHtml(this.post.content)
      this.allLikes = data.likes
    });

    this.blog.getallComment(Number(this.id)).subscribe((res)=>{
      res.map((comment:any)=>{
        this.commentList.push(comment);
        return this.commentList;
      })
    });

  
  }

onComment(commentForm:any){
    commentForm.value.blog_post_id = Number(this.id);
    commentForm.value.comment_date = new Date().toLocaleDateString();
    if(commentForm.valid){
     this.comment = commentForm.value;
     this.blog.addComment(this.comment).subscribe((res:any)=>{
      this.succesMessage = res.message;
     })
     window.location.reload();// arevoir avec un cron
    }
    this.comment_class = this.succesMessage.split(" ")[0]
    console.log(this.comment_class)
    commentForm.reset();
    this.commentsubmit = !this.commentsubmit;
    
  }

  onbpLike(likeForm:any){
    if(likeForm.valid){
      //check if the same email has not yet like the article
     this.user_has_liked =  this.allLikes.some((item:any) => item.email === likeForm.value.email);

     if(this.user_has_liked == true){

      this.like = document.getElementById("like");
      this.like.classList.toggle("liked_already");
      

     }else{
          //like the blogpost 
          likeForm.value.blog_post_id = Number(this.id);
          this.blog.likeblogPost(likeForm.value.blog_post_id,likeForm.value.email).subscribe((res:any)=>{
            //console.log(res)
            this.like = document.getElementById("like");
            this.like.classList.toggle("liked");
            this.post.applause +=1;
            this.like.classList.add("disabled");

          })

     }
      
  
    }
  }

  shareContent(){
      const shareText = 'Check out this awesome content!';
      const shareUrl =   window.location.href;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;
      // Open WhatsApp with the share URL
      window.location.href = whatsappUrl;
  }

  deleteComment(id:number){
    this.blog.deleteComment(id).subscribe((res)=>{
      alert(res.message);
      window.location.reload();
    });
  }

  gotoPost(id:number, slug:string){
    this.router.navigate(['posts/view/' + id +'/' +  slug])
  }

  editblogPost(id:number){
    this.router.navigate(['posts/edit/' + id]);
  }
  backtoPost(){
    this.router.navigate(['posts/']);
  }

}
