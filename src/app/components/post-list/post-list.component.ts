import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../../services/post.service';  // Verify this path
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Add HttpClientModule here
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() userId: number = 1;
  @Output() postSelected = new EventEmitter<number>();
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnChanges() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPostsByUser(this.userId).subscribe(posts => {
      this.posts = posts;
      if (posts.length > 0) {
        this.postSelected.emit(posts[0].id);
      }
    });
  }

  onPostClick(postId: number) {
    this.postSelected.emit(postId);
  }
}