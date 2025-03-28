import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'  // This makes the service available app-wide
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPostsByUser(userId: number) {
    return this.http.get<Post[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}