import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getPostsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts?userId=${userId}`);
  }

  getCommentsByPost(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments?postId=${postId}`);
  }
}
