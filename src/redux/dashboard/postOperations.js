import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';

import { firestore } from '../../firebase/firebase.config';
import { uploadImage } from '../../utils/uploadImage';

export const addPost = createAsyncThunk(
  'post/addPost',
  async (form, { rejectWithValue }) => {
    try {
      const { uid, imageUrl, name, locality, coords } = form;
      const imageName = `${uid}_${Date.now().toString()}`;
      const url = await uploadImage(imageUrl, `images/${imageName}`);
      const postData = {
        owner: uid,
        imageUrl: url,
        name,
        locality,
        coords,
      };
      const result = await addDoc(
        collection(firestore, 'publications'),
        postData
      );
      return { ...postData, id: result?.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (setPosts, { rejectWithValue }) => {
    try {
      const result = await firestore
        .collection('posts')
        .onSnapshot((snapshot) => {
          const allPosts = snapshot.docs.map((doc) => ({
            ...doc.data(),
            postId: doc.id,
          }));

          const sortedPosts = allPosts.slice().sort(function (a, b) {
            var dateA = a.date;
            var dateB = b.date;
            return dateA < dateB ? 1 : -1;
          });

          setPosts(sortedPosts);
        });

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async (data, { rejectWithValue }) => {
    const { postId, commentData } = data;

    try {
      const comment = await firestore
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({ ...commentData });

      return comment;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  'post/addComment',
  async (data, { rejectWithValue }) => {
    const { postId, setComments } = data;

    try {
      const comments = await firestore
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .onSnapshot((snapshot) => {
          const allComments = snapshot.docs.map((doc) => ({
            ...doc.data(),
            commentId: doc.id,
          }));

          setComments(
            allComments.slice().sort(function (a, b) {
              var dateA = a.timestamp;
              var dateB = b.timestamp;
              return dateA > dateB ? 1 : -1;
            })
          );
        });

      return comments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOwnPosts = createAsyncThunk(
  'post/getOwnPosts',
  async (data, { rejectWithValue }) => {
    try {
      const { setPosts, uid } = data;
      const result = await firestore
        .collection('posts')
        .onSnapshot((snapshot) => {
          const allPosts = snapshot.docs.map((doc) => ({
            ...doc.data(),
            postId: doc.id,
          }));

          const filteredPosts = allPosts.filter((post) => post.userId === uid);

          const sortedPosts = filteredPosts.slice().sort(function (a, b) {
            var dateA = a.date;
            var dateB = b.date;
            return dateA < dateB ? 1 : -1;
          });

          setPosts(sortedPosts);
        });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
