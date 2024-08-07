import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { BlogService } from '../services/blog.service';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-blogcategory',
  templateUrl: './blogcategory.component.html',
  styleUrls: ['./blogcategory.component.css']
})
export class BlogcategoryComponent implements OnInit  {

  catName!:string;
  posts:any[] = [];
  isAdmin!:boolean;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private auth:AuthService,
     private  blog:BlogService){}

  ngOnInit(): void {
    this.isAdmin = this.auth.isLogin();
    this.catName = this.route.snapshot.params['catName'];
    console.log(this.catName)
    this.blog.getpostbyCategory(this.catName).subscribe((res)=>{
      res.map((post:any)=>{
        this.posts.push(post);
        console.log(this.posts)
        return this.posts;
      })
    }); 
  }

  viewblogPost(id:number,slug:string){ 
    this.router.navigate(['posts/view/' + id +'/' +  slug]);
  }
  editblogPost(id:number){
    this.router.navigate(['posts/edit/' + id]);
  }
  deleteblogPost(id:number){
    this.blog.deletePost(id).subscribe((res:any)=>{
      alert(res.message);
    });
    window.location.reload();
  }

}
