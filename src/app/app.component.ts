import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UserSelectorComponent,
    PostListComponent,
    CommentListComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
onPostSelected($event: number) {
throw new Error('Method not implemented.');
}
onUserSelected($event: number) {
throw new Error('Method not implemented.');
}
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUserId: number = 1;
  selectedPostId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      this.onUserChange(this.selectedUserId); // Load default user's posts
    });
  }

  onUserChange(userId: number): void {
    this.selectedUserId = userId;
    this.apiService.getPostsByUser(userId).subscribe((data) => {
      this.posts = data;
      if (this.posts.length > 0) {
        this.onPostChange(this.posts[0].id); // Load first post's comments
      } else {
        this.comments = [];
      }
    });
  }

  onPostChange(postId: number): void {
    this.selectedPostId = postId;
    this.apiService.getCommentsByPost(postId).subscribe((data) => {
      this.comments = data;
    });
  }
}