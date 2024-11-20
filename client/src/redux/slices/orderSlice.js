import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk(
  "get/contacts",
  async (_, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/order/product/order`,
      config
    );
    return response.data;
  }
);
export const getunseenOrders = createAsyncThunk(
  "get/unreadOrder",
  async (_, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/order/orders/count-false`,
      config
    );
    return response.data;
  }
);
export const getsuccessOrders = createAsyncThunk(
  "get/successOrder",
  async (_, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/order/orders/count-success`,
      config
    );
    return response.data;
  }
);

export const postOrder = createAsyncThunk(
  "posts/contacts",
  async (post, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/order/product/order`,
      post,
      config
    );
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "delete/contacts",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(
      `${API_BASE_URL}/api/order/product/order/${postId}`,
      config
    );
    return postId;
  }
);

export const updateOrdernotify = createAsyncThunk(
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
export const updateOrderSuccess = createAsyncThunk(
  "update/orderSuccess",
  async (data, thunkApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    const response = await axios.patch(
      `${API_BASE_URL}/api/order/product/order/success/${data.id}`,
      data,
      config
    );
    return response.data;
  }
);

const initialState = {
  orderData: [],
  loading: false,
  posts: [],
  unreadOrder: [],
  unsuccessOrder: [],
};

const contactsSlice = createSlice({
  name: "contactss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    });
    builder.addCase(getunseenOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.unreadOrder = action.payload.unreadOrder;
    });
    builder.addCase(updateOrderSuccess.fulfilled, (state, action) => {
      state.loading = false;
      state.unsuccessOrder = action.payload.data;
      state.orderData = state.orderData.filter(
        (e) => e._id !== action.payload.data._id
      );
      // state.orderData.push(action.payload.data);
    });

    builder.addCase(getOrders.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.orderData.push(action.payload.data);
    });

    builder.addCase(updateOrdernotify.fulfilled, (state, action) => {
      const updatedPost = action.payload.data;
      state.unreadOrder = state.unreadOrder.filter(
        (e) => e._id !== updatedPost._id
      );
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.orderData = state.orderData.filter((e) => e._id !== action.payload);
    });

    // builder.addCase(postOrder.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updatecontacts.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deleteOrder.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = contactsSlice.actions;
export default contactsSlice.reducer;
