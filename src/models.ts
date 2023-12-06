export type CommentListResponse = {
  commentId: string;
  commentText: string;
  createdBy: string;
};

export type UserRequest = {
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
};

export type UserResponse = {
  userId: string;
  username: string;
  role: 'ADMIN' | 'USER';
};
