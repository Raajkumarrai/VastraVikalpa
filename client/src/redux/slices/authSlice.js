import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

// Create async thunks
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const config = {
    headers: {
      "auth-token": JSON.parse(localStorage.getItem("token")),
    },
  };

  const response = await axios.get(`${API_BASE_URL}/api/auth/users`, config);
  return response.data;
});

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/user/${id}`);
  return response.data;
});

export const registerUser = createAsyncThunk("auth/register", async (user) => {
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("image", user.image);

  const response = await axios.post(
    `${API_BASE_URL}/api/auth/register`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    credentials
  );
  return response.data;
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);

    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")), // Pass the token as an argument
      },
    };

    const response = await axios.patch(
      `${API_BASE_URL}/api/auth/user/profile`,
      formData,
      config
    );

    return response.data;
  }
);

export const updateAdmin = createAsyncThunk(
  "auth/updateAdmin",
  async (data) => {
    // console.log(data);
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")), // Pass the token as an argument
      },
    };

    const response = await axios.patch(
      `${API_BASE_URL}/api/auth/user/admin/${data.id}`,
      data,
      config
    );

    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (postId) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")), // Pass the token as an argument
      },
    };

    await axios.delete(`${API_BASE_URL}/api/auth/user/${postId}`, config);
    return postId;
  }
);

// Define initial state
const initialState = {
  allUserData: [],
  authToken: null,
  userData: null,
  loading: false,
  posts: [],
  oneUserData: {},
  renderPage: false,
};

// Create a slice
const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserData = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.oneUserData = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.authToken = action.payload.token ? action.payload.token : null;
        state.userData = action.payload.user ? action.payload.user : null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.authToken = action.payload.token ? action.payload.token : null;
        state.userData = action.payload.user ? action.payload.user : null;
        state.renderPage = !state.renderPage;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.userData = updatedPost;
        let updatedData = state.allUserData.filter(
          (e) => e._id !== updatedPost.user._id
        );
        updatedData.push(updatedPost.user);
        state.allUserData = updatedData;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        let updatedData = state.allUserData.filter(
          (e) => e._id !== updatedPost.user._id
        );
        updatedData.push(updatedPost.user);
        state.allUserData = updatedData;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.allUserData = state.allUserData.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

// Export actions and reducer
export const { increment } = authSlice.actions;
export default authSlice.reducer;
