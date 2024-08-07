import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  categories = ["Maternity","Feminity","Family"];
  id!:string;
  //post!:Post;
  iscreateMode!:boolean;
  email = "";
  admin!:any;
  create_at =  new Date().toLocaleString();
  illustration!:any;


  @ViewChild("addArticle", {static:true}) addArticle:any;
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private blog:BlogService,
    private auth:AuthService
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iscreateMode = !this.id;
    
    //get the connected admin
    this.admin = this.auth.getID()

    //get 
    if(!this.iscreateMode){
      this.blog.viewPost(Number(this.id)).subscribe((res)=>{
        this.addArticle.form.patchValue({
          title: res.post.title,
          category: res.post.category,
          summary: res.post.summary, 
          content: res.post.content,
        });
      })
    }

  }

  //https://medium.com/@ayushgrwl365/a-guide-to-internationalization-i18n-in-angular-a6ca7a9bc027

  selectImage(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.illustration = file;
      
    }
  }

  onSubmit(){
    if(this.iscreateMode){
      this.savePosttoDatabase(this.addArticle)
    }else{
      this.editPost(this.addArticle)
    }
  }

  savePosttoDatabase(addArticle:any){
    if(this.addArticle.valid){
      let post:FormData = new FormData()
      this.addArticle.value.create_at = this.create_at;
      this.addArticle.value.author = this.admin;
      this.addArticle.value.illustration = this.illustration

      post.append('illustration',this.illustration)
      post.append('title',this.addArticle.value.title) 
      post.append('category',this.addArticle.value.category)
      post.append('summary',this.addArticle.value.summary)
      post.append('content',this.addArticle.value.content)
      post.append('create_at', this.addArticle.value.create_at)
      post.append('author',this.addArticle.value.author)
      post.append('imgcredit', this.addArticle.value.imgcredit)

      this.blog.saveBlogPost(post).subscribe((res:any)=>{
        alert(res.message)
      });
      
    }

    this.addArticle.reset();
    this.router.navigate(['/posts'])
  }
  
  editPost(addArticle:any){
    if(this.addArticle.valid){
      let post;
      this.addArticle.value.create_at = this.create_at;
      this.addArticle.value.author = this.admin;
      this.addArticle.value.illustration = this.illustration
      post= {
      'title':this.addArticle.value.title,
      'category':this.addArticle.value.category,
      'summary':this.addArticle.value.summary,
      'content':this.addArticle.value.content,
      'create_at': this.addArticle.value.create_at,
      'author':this.addArticle.value.author,
      }

        this.blog.editPost(Number(this.id),post).subscribe((res:any)=>{
        alert(res.message)
      });
    }
    this.addArticle.reset();
   this.router.navigate(['/posts'])
    
  }

  backToPosts(){
    this.router.navigate(['/posts']);
  }
  viewPost(){
    this.router.navigate(['/posts/'])
  }


}
