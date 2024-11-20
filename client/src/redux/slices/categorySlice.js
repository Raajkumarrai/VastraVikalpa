import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let onProgressChangeCallback = null;
export const setOnProgressChangeCallback = (callback) => {
  onProgressChangeCallback = callback;
};
export let percentCompletedValue = 0;

export const getCategorys = createAsyncThunk("get/categories", async () => {
  const config = { headers: {} };
  const response = await axios.get(
    `${API_BASE_URL}/api/category/categories`,
    config
  );
  return response.data;
});

export const postCategory = createAsyncThunk(
  "posts/category",
  async (post, thunkApi) => {
    const formData = new FormData();
    formData.append("categoryName", post.categoryName);
    formData.append("displayOrder", post.displayOrder);
    formData.append("active", post.active);
    formData.append("showTop", post.showTop);
    formData.append("image", post.image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
      onUploadProgress: (progressEvent) => {
        percentCompletedValue = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgressChangeCallback) {
          onProgressChangeCallback(percentCompletedValue);
        }
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/category/category`,
      formData,
      config
    );
    return response.data;
  }
);
export const updateCategory = createAsyncThunk(
  "update/category",
  async (updatedPost, thunkApi) => {
    const formData = new FormData();
    formData.append("categoryName", updatedPost.categoryName);
    formData.append("displayOrder", updatedPost.displayOrder);
    formData.append("active", updatedPost.active);
    formData.append("showTop", updatedPost.showTop);
    formData.append("image", updatedPost.image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
      onUploadProgress: (progressEvent) => {
        percentCompletedValue = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgressChangeCallback) {
          onProgressChangeCallback(percentCompletedValue);
        }
      },
    };

    const response = await axios.patch(
      `${API_BASE_URL}/api/category/category/${updatedPost.id}`,
      formData,
      config
    );
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "delete/category",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(
      `${API_BASE_URL}/api/category/category/${postId}`,
      config
    );
    return postId;
  }
);

const initialState = {
  data: [],
  loading: false,
  posts: [],
};

const categorySlice = createSlice({
  name: "categorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategorys.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getCategorys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postCategory.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.data.push(action.payload.data);
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      let updatedData = state.data.filter(
        (e) => e._id !== updatedPost.category._id
      );
      updatedData.push(updatedPost.category);
      state.data = updatedData;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.data = state.data.filter((e) => e._id !== action.payload);
    });

    // builder.addCase(postCategory.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updateCategory.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deleteCategory.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = categorySlice.actions;
export default categorySlice.reducer;
