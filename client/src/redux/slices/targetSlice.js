import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTarget = createAsyncThunk("get/target", async (_, thunkApi) => {
  const config = {
    headers: {
      "auth-token": JSON.parse(localStorage.getItem("token")),
    },
  };
  const response = await axios.get(`${API_BASE_URL}/api/target/target`, config);
  return response.data;
});

export const postTarget = createAsyncThunk(
  "posts/target",
  async (post, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/target/target`,
      post,
      config
    );
    return response.data;
  }
);

export const deleteTarget = createAsyncThunk(
  "delete/target",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(`${API_BASE_URL}/api/target/target/${postId}`, config);
    return postId;
  }
);

export const updateTarget = createAsyncThunk(
  "update/target",
  async (data, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/api/target/target/${data.id}`,
      data,
      config
    );
    return response.data;
  }
);

const initialState = {
  targetData: [],
  loading: false,
};

const targetSlice = createSlice({
  name: "targets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTarget.fulfilled, (state, action) => {
      state.loading = false;
      state.targetData = action.payload;
    });

    builder.addCase(postTarget.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.targetData.push(action.payload.data);
    });

    builder.addCase(updateTarget.fulfilled, (state, action) => {
      state.targetData = [action.payload.data];
    });

    // builder.addCase(deletetarget.fulfilled, (state, action) => {
    //   state.posts = state.posts.filter((post) => post._id !== action.payload);
    //   state.targetData = state.targetData.filter(
    //     (e) => e._id !== action.payload
    //   );
    // });
  },
});

export const { increment } = targetSlice.actions;
export default targetSlice.reducer;
