import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId: number) {
    console.log('Fetching comments for Post ID:', postId); // Debugging log
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`).pipe(
      tap((comments) => console.log('Fetched Comments:', comments)), // Debugging log
      catchError((error) => {
        console.error('Error fetching comments:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}