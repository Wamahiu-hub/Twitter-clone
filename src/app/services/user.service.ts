import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}