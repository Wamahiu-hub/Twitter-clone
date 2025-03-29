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
onPostSelected(postId: number): void {
  console.log('Post selected in AppComponent:', postId); // Debugging log
  this.onPostChange(postId);
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
    if (this.selectedUserId !== userId) {
      this.selectedUserId = userId;
      this.selectedPostId = null; // Reset selected post
    }
  }

  onPostChange(postId: number): void {
    if (this.selectedPostId !== postId) {
      this.selectedPostId = postId;
      console.log('Selected Post ID:', this.selectedPostId); // Debugging log
    }
  }
}