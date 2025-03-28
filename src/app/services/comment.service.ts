import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId: number) {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }
}