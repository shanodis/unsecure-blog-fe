import axios from 'axios';
import * as bootstrap from 'bootstrap';
import { user } from './auth.ts';
import { CommentListResponse } from "./models.ts";

const addComment = async (): Promise<void> => {
  const commentInput = document.getElementById('comment') as HTMLInputElement;
  if (!commentInput) {
    console.error('Comment input not found');
    return;
  }
  const requestData = { commentText: commentInput.value };
  const { data } = await axios.post<CommentListResponse>(`/api/comments/${user.userId}/add`, requestData);
  const addedComment = document.getElementById('comment-preview');
  if (!addedComment) {
    console.error('Comment preview not found');
    return;
  }
  // HACKABLE
  addedComment.innerHTML = `Added new comment: ${data.commentText}`;
  // SECURED
  // addedComment.textContent = `Added new comment: ${data.commentText}`;
  console.log('User comment added: ', data);
};

const addCommentButton = document.getElementById('add-comment-button');
if (addCommentButton) {
  addCommentButton.addEventListener('click', addComment);
}

const toastTrigger = document.getElementById('add-comment-button')
const toast = document.getElementById('add-comment')

if (toastTrigger && toast) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastTrigger.addEventListener('click', async () => {
    try {
      await addComment();
      toastBootstrap.show();
    } catch (e) {
      console.error(`Error adding comment: ${e}`);
    }
  });
}
