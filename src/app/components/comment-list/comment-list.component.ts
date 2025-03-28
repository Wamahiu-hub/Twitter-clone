import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  @Input() postId: number = 1;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnChanges() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByPost(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}