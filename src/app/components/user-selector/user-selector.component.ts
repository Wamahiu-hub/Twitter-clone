import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent {
  users: User[] = [];
  @Output() userSelected = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.userSelected.emit(1); // Default to user with ID 1
    });
  }

  onUserSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const userId = parseInt(selectElement.value);
    this.userSelected.emit(userId);
  }
}