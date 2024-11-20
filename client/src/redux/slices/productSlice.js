import { API_BASE_URL } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let onProgressChangeCallback = null;
export const setOnProgressChangeCallback = (callback) => {
  onProgressChangeCallback = callback;
};
export let percentCompletedValue = 0;

export const getproducts = createAsyncThunk("get/products", async () => {
  const config = { headers: {} };
  const response = await axios.get(`${API_BASE_URL}/api/post/blogs`, config);
  return response.data;
});
export const getSingleProduct = createAsyncThunk("get/product", async (id) => {
  const config = { headers: {} };
  const response = await axios.get(
    `${API_BASE_URL}/api/post/blog/${id}`,
    config
  );
  return response.data;
});

export const postproduct = createAsyncThunk(
  "post/product",
  async (productDataForm, thunkApi) => {
    const formData = new FormData();
    formData.append("categoryId", productDataForm.categoryId);
    formData.append(
      "subcategoryId",
      productDataForm.subCategoryId !== "null"
        ? productDataForm.subCategoryId
        : ""
    );
    formData.append("title", productDataForm.productTitle);
    formData.append("description", productDataForm.description);
    formData.append("maxQuantity", productDataForm.productQuantity);
    formData.append("address", "Macchapokhari, Kathmandu");
    formData.append("phNumber", "9810325922");
    formData.append("gendertype", productDataForm.gendertype);
    formData.append("price", productDataForm.productPrice);
    formData.append("discount", productDataForm.productDiscount);
    // formData.append("productcolor", productDataForm.productcolor);
    for (var i = 0; i < productDataForm.productcolor.length; i++) {
      formData.append("productcolor", productDataForm.productcolor[i]);
    }
    // formData.append("image", productDataForm.productImage[0]);
    for (var j = 0; j < productDataForm.productImage.length; j++) {
      formData.append("image", productDataForm.productImage[j]);
    }

    try {
      // Make the API request using axios
      const response = await axios.post(
        `${API_BASE_URL}/api/post/blogs`,
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

export const updateproduct = createAsyncThunk(
  "update/product",
  async (productDataForm, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("categoryId", productDataForm.categoryId);
      formData.append(
        "subcategoryId",
        productDataForm.subCategoryId !== "null"
          ? productDataForm.subCategoryId
          : ""
      );
      console.log(productDataForm);
      formData.append("title", productDataForm.productTitle);
      formData.append("description", productDataForm.description);
      formData.append("maxQuantity", productDataForm.productQuantity);
      formData.append("address", "Macchapokhari, Kathmandu");
      formData.append("phNumber", "9810325922");
      formData.append("gendertype", productDataForm.gendertype);
      formData.append("price", productDataForm.productPrice);
      formData.append("discount", productDataForm.productDiscount);
      // formData.append("productcolor", productDataForm.productcolor);
      for (var i = 0; i < productDataForm.productcolor.length; i++) {
        formData.append("productcolor", productDataForm.productcolor[i]);
      }
      if (productDataForm.productImage) {
        // formData.append(
        //   "image",
        //   productDataForm.productImage[0] ? productDataForm.productImage[0] : ""
        // );
        for (var ii = 0; ii < productDataForm.productImage.length; ii++) {
          formData.append("image", productDataForm.productImage[ii]);
        }
      }

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
        `${API_BASE_URL}/api/post/blogs/${productDataForm.id}`,
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

export const deleteproduct = createAsyncThunk(
  "delete/product",
  async (postId, thunkApi) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios.delete(`${API_BASE_URL}/api/post/blogs/${postId}`, config);
    return postId;
  }
);

const initialState = {
  productData: [],
  loading: false,
  posts: [],
};

const productslice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    });

    builder.addCase(getproducts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postproduct.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.productData.push(action.payload.product);
    });

    builder.addCase(updateproduct.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      let updatedData = state.productData.filter(
        (e) => e._id !== updatedPost.product._id
      );
      updatedData.push(updatedPost.product);
      state.productData = updatedData;
    });

    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.productData = state.productData.filter(
        (e) => e._id !== action.payload
      );
    });

    // builder.addCase(postproduct.pending, (state, action) => {
    //   // Handle pending state for post creation if needed
    // });

    // builder.addCase(updateproduct.pending, (state, action) => {
    //   // Handle pending state for post update if needed
    // });

    // builder.addCase(deleteproduct.pending, (state, action) => {
    //   // Handle pending state for post deletion if needed
    // });
  },
});

export const { increment } = productslice.actions;
export default productslice.reducer;
