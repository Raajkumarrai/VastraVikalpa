import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let onProgressChangeCallback = null;
export const setOnProgressChangeCallback = (callback) => {
  onProgressChangeCallback = callback;
};
export let percentCompletedValue = 0;

export const getcarousels = createAsyncThunk("get/carousels", async () => {
  const config = { headers: {} };
  const response = await axios.get(
    `${API_BASE_URL}/api/carousel/carouseles`,
    config
  );
  return response.data;
});

export const postcarousel = createAsyncThunk(
  "posts/carousel",
  async (post, thunkApi) => {
    const formData = new FormData();
    formData.append("title", post.bannerTitle);
    formData.append("description", post.bannerDescription);
    formData.append("image", post.bannerImage);
    formData.append("active", post.bannerActive);
    formData.append("bannerHighlights", post.bannerHighlights);
    formData.append("category", post.bannerCategoryId);

    try {
      // Make the API request using axios
      const response = await axios.post(
        `${API_BASE_URL}/api/carousel/carousel`,
        formData,
        {
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
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatecarousel = createAsyncThunk(
  "update/carousel",
  async (updatedPost, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedPost.bannerTitle);
      formData.append("description", updatedPost.bannerDescription);
      formData.append("image", updatedPost.bannerImage);
      formData.append("active", updatedPost.bannerActive);
      formData.append("bannerHighlights", updatedPost.bannerHighlights);
      formData.append("category", updatedPost.bannerCategoryId);

      const config = {
        headers: {
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
        `${API_BASE_URL}/api/carousel/carousel/${updatedPost.id}`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      // Handle errors appropriately, e.g., dispatch an error action
      throw error;
    }
  }
);

export const deletecarousel = createAsyncThunk(
  "delete/carousel",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(
      `${API_BASE_URL}/api/carousel/carousel/${postId}`,
      config
    );
    return postId;
  }
);

const initialState = {
  carData: [],
  loading: false,
  posts: [],
};

const carouselSlice = createSlice({
  name: "carousels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcarousels.fulfilled, (state, action) => {
      state.loading = false;
      state.carData = action.payload;
    });

    builder.addCase(getcarousels.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postcarousel.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.carData.push(action.payload.carousel);
    });

    builder.addCase(updatecarousel.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      let updatedData = state.carData.filter(
        (e) => e._id !== updatedPost.carousel._id
      );
      updatedData.push(updatedPost.carousel);
      state.carData = updatedData;
    });

    builder.addCase(deletecarousel.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.carData = state.carData.filter((e) => e._id !== action.payload);
    });

    // builder.addCase(postcarousel.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updatecarousel.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deletecarousel.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = carouselSlice.actions;
export default carouselSlice.reducer;
