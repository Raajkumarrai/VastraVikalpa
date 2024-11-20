import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
  "get/contacts",
  async (_, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/contact/contacts`,
      config
    );
    return response.data;
  }
);
export const getUnreadMsg = createAsyncThunk(
  "get/unreadMsg",
  async (_, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/contact/contacts/count-false`,
      config
    );
    return response.data;
  }
);

export const postContacts = createAsyncThunk(
  "posts/contacts",
  async (post, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/contact/contact`,
      post,
      config
    );
    return response.data;
  }
);

export const deleteContacts = createAsyncThunk(
  "delete/contacts",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(`${API_BASE_URL}/api/contact/contact/${postId}`, config);
    return postId;
  }
);

export const updateunreadcontent = createAsyncThunk(
  "update/contacts",
  async (id, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/api/contact/contact/${id}/notify`,
      {},
      config
    );
    return response.data;
  }
);

const initialState = {
  contactData: [],
  loading: false,
  posts: [],
  unreadMsg: [],
};

const contactsSlice = createSlice({
  name: "contactss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contactData = action.payload;
    });
    builder.addCase(getUnreadMsg.fulfilled, (state, action) => {
      state.loading = false;
      state.unreadMsg = action.payload.unreadMessages;
    });

    builder.addCase(getContacts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postContacts.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.contactData.push(action.payload.data);
    });

    builder.addCase(updateunreadcontent.fulfilled, (state, action) => {
      const updatedPost = action.payload.data;
      state.unreadMsg = state.unreadMsg.filter(
        (e) => e._id !== updatedPost._id
      );
    });

    builder.addCase(deleteContacts.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.contactData = state.contactData.filter(
        (e) => e._id !== action.payload
      );
    });

    // builder.addCase(postContacts.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updatecontacts.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deleteContacts.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = contactsSlice.actions;
export default contactsSlice.reducer;
