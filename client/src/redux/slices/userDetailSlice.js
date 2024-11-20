import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getdetail = createAsyncThunk("get/detail", async (_, thunkApi) => {
  const config = {
    headers: {
      "auth-token": JSON.parse(localStorage.getItem("token")),
    },
  };
  const response = await axios.get(
    `${API_BASE_URL}/api/order/orderaddress`,
    config
  );
  return response.data;
});

export const postdetail = createAsyncThunk(
  "posts/detail",
  async (post, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/order/orderaddress`,
      post,
      config
    );
    return response.data;
  }
);

export const deletedetail = createAsyncThunk(
  "delete/detail",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(
      `${API_BASE_URL}/api/order/orderaddress/${postId}`,
      config
    );
    return postId;
  }
);

export const updateunreadcontent = createAsyncThunk(
  "update/detail",
  async (data, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/api/order/orderaddress/${data.id}`,
      data,
      config
    );
    return response.data;
  }
);

const initialState = {
  detailData: [],
  loading: false,
  posts: [],
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getdetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detailData = action.payload;
    });

    builder.addCase(getdetail.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postdetail.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.detailData.push(action.payload.data);
    });

    builder.addCase(updateunreadcontent.fulfilled, (state, action) => {
      const updatedPost = action.payload.data;
      state.unreadMsg = state.unreadMsg.filter(
        (e) => e._id !== updatedPost._id
      );
    });

    builder.addCase(deletedetail.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.detailData = state.detailData.filter(
        (e) => e._id !== action.payload
      );
    });

    // builder.addCase(postdetail.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updatedetail.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deletedetail.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = detailSlice.actions;
export default detailSlice.reducer;
