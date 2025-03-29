import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class CommentListComponent implements OnChanges {
  @Input() postId: number = 1;
  comments: Comment[] = [];
  private previousPostId: number | null = null;

  constructor(private commentService: CommentService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['postId'] && this.postId !== this.previousPostId) {
      this.previousPostId = this.postId;
      console.log('Received Post ID in CommentListComponent:', this.postId); // Debugging log
      this.loadComments();
    }
  }

  loadComments() {
    if (this.postId) {
      this.commentService.getCommentsByPost(this.postId).subscribe(
        (comments) => {
          this.comments = comments;
          console.log('Comments loaded in CommentListComponent:', this.comments); // Debugging log
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }
}