import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let onProgressChangeCallback = null;
export const setOnProgressChangeCallback = (callback) => {
  onProgressChangeCallback = callback;
};
export let percentCompletedValue = 0;

export const getsubcategorys = createAsyncThunk("get/subcategory", async () => {
  const config = { headers: {} };
  const response = await axios.get(
    `${API_BASE_URL}/api/subcategory/subcategory`,
    config
  );
  return response.data;
});

export const postsubcategory = createAsyncThunk(
  "posts/subcategory",
  async (post, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
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
      `${API_BASE_URL}/api/subcategory/subcategory`,
      post,
      config
    );
    return response.data;
  }
);

export const updatesubcategory = createAsyncThunk(
  "update/subcategory",
  async (updatedPost, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
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
      `${API_BASE_URL}/api/subcategory/subcategory/${updatedPost.id}`,
      updatedPost,
      config
    );
    return response.data;
  }
);

export const deletesubcategory = createAsyncThunk(
  "delete/subcategory",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(
      `${API_BASE_URL}/api/subcategory/subcategory/${postId}`,
      config
    );
    return postId;
  }
);

const initialState = {
  subcatData: [],
  loading: false,
  posts: [],
};

const subcategorySlice = createSlice({
  name: "subcategorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getsubcategorys.fulfilled, (state, action) => {
      state.loading = false;
      state.subcatData = action.payload;
    });

    builder.addCase(getsubcategorys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postsubcategory.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.subcatData.push(action.payload.data);
    });

    builder.addCase(updatesubcategory.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      let updatedsubcatData = state.subcatData.filter(
        (e) => e._id !== updatedPost.subcategory._id
      );
      updatedsubcatData.push(updatedPost.subcategory);
      state.subcatData = updatedsubcatData;
    });

    builder.addCase(deletesubcategory.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.subcatData = state.subcatData.filter(
        (e) => e._id !== action.payload
      );
    });

    // builder.addCase(postsubcategory.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updatesubcategory.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deletesubcategory.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = subcategorySlice.actions;
export default subcategorySlice.reducer;
