import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { PostListService } from './services/post-list.service';
import { Post } from '../model/post.model';




@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss']
})



export class PostListComponent implements OnInit {
    posts: Post[];
    subscriptionPosts: Subscription;

    constructor(
        public activeRoute: ActivatedRoute,
        public postService: PostListService) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
        // this.problem = this.data.getProblem(+params['id']);
        this.postService.getPosts(+params['id'])
            .subscribe(posts => {this.posts = posts;});
        })
    }
}
