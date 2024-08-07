import { Component, OnInit } from '@angular/core';
import { Post, PostResult } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  post!:PostResult;
  postList:PostResult[] = [];
  filteredPostList:PostResult[] = [];
  isAdmin!:boolean;
  isEmpty!:boolean;
  emptyquery= false;

  constructor(private blog:BlogService,
    private auth:AuthService,
     private route:ActivatedRoute,private router:Router){
    this.filteredPostList = this.postList;
  }

  ngOnInit(): void {
    
    //if article list is empty display the empty component 
    this.isAdmin= this.auth.isLogin();
       this.blog.getblogpostList().subscribe((data)=>{
        data.map((post:any)=>{
          this.postList.push(post);
          return this.postList;
    })});

    setTimeout(() => {
      if(this.postList.length == 0){
        this.isEmpty = true
      } else{
        this.isEmpty = false
      }
      
    }, 1000);
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

  
  searchArticleByTerm(query:string){
    let searchterm = query.search.toString();
    if(!query){
      this.filteredPostList = this.postList;
    }
  this.filteredPostList = this.postList.filter(
    PostResult =>
    PostResult?.title.toLowerCase().includes(searchterm.toLocaleLowerCase()) ||
    PostResult?.category.toLowerCase().includes(searchterm.toLocaleLowerCase()) ||
    PostResult?.content.toLowerCase().includes(searchterm.toLocaleLowerCase())
     )

    if(this.filteredPostList.length==0){
      this.filteredPostList = this.postList;
      this.emptyquery = true;
    }
  }

}
