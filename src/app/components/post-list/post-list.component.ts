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
  private previousUserId: number | null = null;

  constructor(private postService: PostService) {}

  ngOnChanges() {
    if (this.userId !== this.previousUserId) {
      this.previousUserId = this.userId;
      this.loadPosts();
    }
  }

  loadPosts() {
    this.postService.getPostsByUser(this.userId).subscribe(posts => {
      this.posts = posts;
      // Remove redundant emission of the first post's ID
    });
  }

  onPostClick(postId: number) {
    console.log('Post clicked in PostListComponent:', postId); // Debugging log
    this.postSelected.emit(postId);
  }
}