import axios from 'axios';
import { CommentListResponse } from "./models.ts";

const getComments = async (): Promise<void> => {
  const { data } = await axios.get<CommentListResponse[]>('/api/comments');
  const allCommentDiv = document.getElementById('all-comment-div');
  if (!allCommentDiv) {
    console.error('Comment div not found');
    return;
  }
  data.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.className = 'card mb-3';

    const row = document.createElement('div');
    row.className = 'row g-0';
    commentElement.appendChild(row);

    const col = document.createElement('div');
    col.className = 'col-md-4 d-flex align-items-center';
    row.appendChild(col);

    const img = document.createElement('img');
    img.src = 'public/person-circle.svg';
    img.alt = '...';
    img.className = 'img-fluid rounded-start';
    img.style.width = '70%';
    img.style.height = '70%';

    col.appendChild(img);

    const col2 = document.createElement('div');
    col2.className = 'col-md-8';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    col2.appendChild(cardBody);

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = comment.createdBy;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = comment.commentText;
    cardBody.appendChild(cardText);

    row.appendChild(col2);

    allCommentDiv.appendChild(commentElement);
  });
};

(async function init() {
  await getComments();
})();
