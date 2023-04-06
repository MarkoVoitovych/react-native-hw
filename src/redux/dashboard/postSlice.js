import { createSlice } from '@reduxjs/toolkit';
import {
  addPost,
  getPosts,
  getOwnPosts,
  addComment,
} from './postOperations.js';

const initialState = {
  error: null,
  isFetching: false,
  posts: [],
};

const pending = (state) => {
  state.isFetching = true;
};

const rejected = (state, { payload }) => {
  state.error = payload;
  state.isFetching = false;
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      state.posts = [...state.posts, payload];
      state.isFetching = false;
    });
    builder.addCase(addPost.pending, pending);
    builder.addCase(addPost.rejected, rejected);

    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.isFetching = false;
    });
    builder.addCase(getPosts.pending, pending);
    builder.addCase(getPosts.rejected, rejected);

    builder.addCase(addComment.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(getOwnPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.isFetching = false;
    });
    builder.addCase(getOwnPosts.pending, pending);
    builder.addCase(getOwnPosts.rejected, rejected);
  },
});
