import axios from 'axios';
import { CommentListResponse, UserRequest, UserResponse } from "./models.ts";

let users: UserResponse[] = [];

const approveComment = async (commentId: string, isCommentApproved: boolean): Promise<void> => {
  const requestData = { isCommentApproved };
  const { data } = await axios.patch<CommentListResponse>(`/api/comments/${commentId}/approve`, requestData);
  console.log('Comment approved: ', data);
};

const getCommentsToVerify = async (): Promise<void> => {
  const { data } = await axios.get<CommentListResponse[]>('/api/comments/unverified');
  const commentDiv = document.getElementById('comment-div');
  data.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.textContent = comment.commentText;

    const approveButton = document.createElement('button');
    approveButton.innerHTML = 'Approve';
    approveButton.onclick = () => {
      approveComment(comment.commentId, true);
      window.location.reload();
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = () => {
      approveComment(comment.commentId, false);
      window.location.reload();
    };

    commentElement.appendChild(approveButton);
    commentElement.appendChild(deleteButton);

    if (!commentDiv) {
      console.error('Comment div not found');
      return;
    }

    commentDiv.appendChild(commentElement);
  });
};

const getAllUsers = async (): Promise<UserResponse[]> => {
  const { data } = await axios.get('/api/users/all');
  console.log('All users: ', data);
  return data;
};

const showAllUsers = (): void => {
  const userDiv = document.getElementById('user-div');
  users.forEach((user) => {
    const userElement = document.createElement('div');
    userElement.textContent = user.username;
    if (!userDiv) {
      console.error('User div not found');
      return;
    }
    userDiv.appendChild(userElement);
  });
};

const addUser = async (): Promise<void> => {
  const requestData: UserRequest = { username: `user${users.length + 1}`, password: 'user', role: 'USER' };
  // HACKABLE
  // await axios.get('/api/users', { params: requestData });
  // SECURED
  await axios.post('/api/users', requestData);
  window.location.reload();
};

const addAdmin = async () => {
  const requestData: UserRequest = { username: `admin${users.length + 1}`, password: 'admin', role: 'ADMIN' };
  // HACKABLE
  // await axios.get('/api/users', { params: requestData });
  // SECURED
  await axios.post('/api/users', requestData);
  window.location.reload();
};

const addUserButton = document.getElementById('add-user-button');
if (addUserButton) {
  addUserButton.addEventListener('click', addUser);
}

const addAdminButton = document.getElementById('add-admin-button');

if (addAdminButton) {
  addAdminButton.addEventListener('click', addAdmin);
}

(async function init() {
  await getCommentsToVerify();
  users = await getAllUsers();
  showAllUsers();
}());

