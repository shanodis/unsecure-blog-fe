import axios from 'axios';
import { CommentListResponse } from "./models.ts";

const getComments = async (): Promise<void> => {
  const { data } = await axios.get<CommentListResponse[]>('/api/comments');
  const allCommentDiv = document.getElementById('all-comment-div');
  data.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.textContent = comment.commentText;

    const addedBy = document.createElement('div');
    addedBy.innerHTML = `<h6>Added by: ${comment.createdBy}</h6>`;

    if (!allCommentDiv) {
      console.error('Comment div not found');
      return;
    }
    allCommentDiv.appendChild(addedBy);
    allCommentDiv.appendChild(commentElement);
  });
};

(async function init() {
  await getComments();
})();
