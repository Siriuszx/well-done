import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppFetch } from '@/lib/useAppFetch';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { CommentData, CommentDataSchema } from '@/types/entityData/CommentData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

type CommentEditorState = {
  textField: string;
  isEditMode: boolean;
  isOverflown: boolean;
  postCommentState: {
    isLoading: boolean;
    error: ErrorData | null;
  };
  updateCommentState: {
    commentId: string | null;
    isLoading: boolean;
    error: ErrorData | null;
  };
};

type PostCommentType = { postId: string; commentBody: string };
type UpdateCommentType = { commentId: string; commentBody: string };

const initialState: CommentEditorState = {
  textField: '',
  isEditMode: false,
  isOverflown: false,
  postCommentState: {
    isLoading: false,
    error: null,
  },
  updateCommentState: {
    commentId: null,
    isLoading: false,
    error: null,
  },
};

export const postComment = createAsyncThunk<
  CommentData,
  PostCommentType,
  { rejectValue: ErrorData }
>('comments/postComment', async ({ postId, commentBody }, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body: commentBody }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = CommentDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as CommentData;
});

export const updateComment = createAsyncThunk<
  CommentData,
  UpdateCommentType,
  { rejectValue: ErrorData }
>('comments/updateComment', async ({ commentId, commentBody }, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body: commentBody }),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = CommentDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as CommentData;
});

const commentEditorSlice = createSlice({
  name: 'commentEditor',
  initialState,
  reducers: {
    setCommentTextField(state, action) {
      state.textField = action.payload;
    },
    enterEditMode(state, action) {
      state.textField = action.payload.commentBody;
      state.isEditMode = true;
      state.updateCommentState.commentId = action.payload.commentId;
    },
    exitEditMode(state) {
      state.textField = '';
      state.isEditMode = false;
      state.updateCommentState.commentId = null;
    },
    setIsOverflown(state, action: PayloadAction<boolean>) {
      state.isOverflown = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postComment.pending, (state) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = null;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.postCommentState.isLoading = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.postCommentState.isLoading = true;
        state.postCommentState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(updateComment.pending, (state) => {
        state.updateCommentState.isLoading = true;
        state.updateCommentState.error = null;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.updateCommentState.isLoading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.updateCommentState.isLoading = false;
        state.postCommentState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export const { setCommentTextField, enterEditMode, exitEditMode, setIsOverflown } =
  commentEditorSlice.actions;

export default commentEditorSlice.reducer;

export const selectCommentTextField = (state: RootState) => state.commentEditor.textField;

export const selectCommentIsEditMode = (state: RootState) =>
  state.commentEditor.isEditMode;

export const selectIsCommentOverflown = (state: RootState) =>
  state.commentEditor.isOverflown;

export const selectEditCommentId = (state: RootState) =>
  state.commentEditor.updateCommentState.commentId;

export const selectPostCommentState = (state: RootState) =>
  state.commentEditor.postCommentState;

export const selectUpdateCommentState = (state: RootState) =>
  state.commentEditor.updateCommentState;
